<?php

use App\Models\Template;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

beforeEach(function () {
    Storage::fake('public');
    $this->seed(DatabaseSeeder::class);
});

test('public can list active templates', function () {
    $response = $this->getJson('/api/templates');

    $response->assertOk()
        ->assertJsonStructure([
            'status',
            'data' => [
                '*' => ['id', 'slug', 'name', 'category', 'price', 'cover_image'],
            ],
        ]);
});

test('public can get single template by slug', function () {
    $template = Template::first();

    $response = $this->getJson("/api/templates/{$template->slug}");

    $response->assertOk()
        ->assertJsonPath('data.slug', $template->slug)
        ->assertJsonPath('data.name', $template->name);
});

test('public can get business settings', function () {
    $response = $this->getJson('/api/settings');

    $response->assertOk()
        ->assertJsonPath('data.admin_whatsapp', '085723138515');
});

test('customer can create order and upload couple photo', function () {
    $template = Template::first();
    $fakePhoto = UploadedFile::fake()->image('couple.jpg', 600, 800);

    $payload = [
        'customer_name' => 'Bambang Sutrisno',
        'customer_whatsapp' => '081234567899',
        'customer_email' => 'bambang@example.com',
        'template_slug' => $template->slug,
        'groom_nickname' => 'Bambang',
        'groom_full_name' => 'Bambang Sutrisno, S.T.',
        'groom_parents' => 'Bpk. Sutrisno & Ibu Suparti',
        'bride_nickname' => 'Dewi',
        'bride_full_name' => 'Dewi Lestari, S.Pd.',
        'bride_parents' => 'Bpk. Lestari & Ibu Sri',
        'wedding_date' => '2026-12-20',
        'events' => [
            'akad' => [
                'time' => '08:00 - 10:00 WIB',
                'venue' => 'Masjid Raya',
                'address' => 'Jl. Pemuda No. 10',
            ],
            'resepsi' => [
                'time' => '11:00 - 14:00 WIB',
                'venue' => 'Gedung Pertemuan',
                'address' => 'Jl. Pemuda No. 12',
            ],
        ],
        'customer_notes' => 'Tolong musik lagu romantis instrumental',
        'main_photo' => $fakePhoto,
    ];

    $response = $this->postJson('/api/orders', $payload);

    $response->assertCreated()
        ->assertJsonStructure([
            'status',
            'message',
            'data' => ['id', 'order_ref', 'customer_name', 'payment_status', 'files'],
        ]);

    $orderRef = $response->json('data.order_ref');
    $this->assertDatabaseHas('orders', [
        'order_ref' => $orderRef,
        'customer_name' => 'Bambang Sutrisno',
        'payment_status' => 'pending',
    ]);

    $this->assertDatabaseHas('order_files', [
        'file_type' => 'main_photo',
        'file_name' => 'couple.jpg',
    ]);
});

test('admin can login via sanctum and access metrics', function () {
    $admin = User::where('email', 'admin@dnvite.com')->first();

    $loginResponse = $this->postJson('/api/admin/login', [
        'email' => 'admin@dnvite.com',
        'password' => 'password123',
    ]);

    $loginResponse->assertOk()
        ->assertJsonStructure([
            'status',
            'data' => ['token', 'user'],
        ]);

    $token = $loginResponse->json('data.token');

    $metricsResponse = $this->withHeader('Authorization', "Bearer {$token}")
        ->getJson('/api/admin/metrics');

    $metricsResponse->assertOk()
        ->assertJsonStructure([
            'status',
            'data' => [
                'metrics' => ['total_orders', 'new_orders', 'pending_payment', 'total_revenue'],
            ],
        ]);
});
