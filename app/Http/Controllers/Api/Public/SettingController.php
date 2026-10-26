<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;

class SettingController extends Controller
{
    /**
     * Get public business contact and payment configuration.
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
}
