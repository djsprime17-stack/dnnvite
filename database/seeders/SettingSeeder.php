<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Setting::set('admin_whatsapp', '085723138515');
        Setting::set('brand_name', 'DNVITE — Digital Wedding Invitation');
        Setting::set('operational_hours', 'Senin – Minggu: 08:00 – 21:00 WIB');
        Setting::set('bank_accounts', [
            ['bank' => 'Bank Central Asia (BCA)', 'number' => '8830192841', 'name' => 'DNVITE INDONESIA'],
            ['bank' => 'Bank Mandiri', 'number' => '1370019284711', 'name' => 'DNVITE INDONESIA'],
        ]);
    }
}
