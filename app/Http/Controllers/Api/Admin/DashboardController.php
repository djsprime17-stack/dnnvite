<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Template;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Get overview metrics and statistics for Admin Dashboard.
     */
    public function metrics(): JsonResponse
    {
        $totalOrders = Order::count();
        $newOrders = Order::where('created_at', '>=', now()->subDays(7))->count();
        $pendingPayment = Order::where('payment_status', 'pending')->count();
        $inProgress = Order::where('production_status', 'in_progress')->count();
        $completed = Order::where('production_status', 'completed')->count();
        $totalRevenue = Order::where('payment_status', 'verified')->sum('total_payment');
        $activeTemplates = Template::where('is_active', true)->count();

        $recentOrders = Order::with('template')
            ->latest()
            ->take(5)
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'metrics' => [
                    'total_orders' => $totalOrders,
                    'new_orders' => $newOrders,
                    'pending_payment' => $pendingPayment,
                    'in_progress' => $inProgress,
                    'completed' => $completed,
                    'total_revenue' => (float) $totalRevenue,
                    'active_templates' => $activeTemplates,
                ],
                'recent_orders' => $recentOrders,
            ],
        ]);
    }
}
