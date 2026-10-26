<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Get all business configuration settings.
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'admin_whatsapp' => Setting::get('admin_whatsapp', '085723138515'),
                'brand_name' => Setting::get('brand_name', 'DNVITE'),
                'operational_hours' => Setting::get('operational_hours', 'Senin – Minggu: 08:00 – 21:00 WIB'),
                'bank_accounts' => Setting::get('bank_accounts', []),
            ],
        ]);
    }

    /**
     * Update business settings.
     */
    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'admin_whatsapp' => ['nullable', 'string', 'max:30'],
            'brand_name' => ['nullable', 'string', 'max:255'],
            'operational_hours' => ['nullable', 'string', 'max:255'],
            'bank_accounts' => ['nullable', 'array'],
        ]);

        foreach ($validated as $key => $val) {
            if ($val !== null) {
                Setting::set($key, $val);
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Pengaturan bisnis berhasil diperbarui.',
            'data' => [
                'admin_whatsapp' => Setting::get('admin_whatsapp'),
                'brand_name' => Setting::get('brand_name'),
                'operational_hours' => Setting::get('operational_hours'),
                'bank_accounts' => Setting::get('bank_accounts'),
            ],
        ]);
    }
}
