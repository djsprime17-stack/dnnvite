<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * List all customer orders with search, filters, and pagination.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Order::with(['template', 'files'])->latest();

        if ($request->filled('search')) {
            $search = $request->query('search');
            $query->where(function ($q) use ($search) {
                $q->where('order_ref', 'like', "%{$search}%")
                    ->orWhere('customer_name', 'like', "%{$search}%")
                    ->orWhere('customer_whatsapp', 'like', "%{$search}%")
                    ->orWhere('groom_full_name', 'like', "%{$search}%")
                    ->orWhere('bride_full_name', 'like', "%{$search}%");
            });
        }

        if ($request->filled('payment_status') && $request->query('payment_status') !== 'all') {
            $query->where('payment_status', $request->query('payment_status'));
        }

        if ($request->filled('production_status') && $request->query('production_status') !== 'all') {
            $query->where('production_status', $request->query('production_status'));
        }

        $perPage = (int) $request->query('per_page', 15);
        $orders = $query->paginate($perPage);

        return response()->json([
            'status' => 'success',
            'data' => $orders,
        ]);
    }

    /**
     * Show single order details including uploaded photos.
     */
    public function show(int $id): JsonResponse
    {
        $order = Order::with(['template', 'files'])->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $order,
        ]);
    }

    /**
     * Update order payment or production status.
     */
    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'payment_status' => ['nullable', 'string', 'in:pending,verified,cancelled'],
            'production_status' => ['nullable', 'string', 'in:queued,in_progress,ready,completed'],
        ]);

        $order = Order::findOrFail($id);
        $order->update(array_filter($validated));

        return response()->json([
            'status' => 'success',
            'message' => 'Status pesanan berhasil diperbarui.',
            'data' => $order,
        ]);
    }

    /**
     * Update internal administrative notes.
     */
    public function updateNotes(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'internal_notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $order = Order::findOrFail($id);
        $order->update(['internal_notes' => $validated['internal_notes'] ?? null]);

        return response()->json([
            'status' => 'success',
            'message' => 'Catatan internal berhasil disimpan.',
            'data' => $order,
        ]);
    }
}
