<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\OrderFile;
use App\Models\Template;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Create a new customer order with uploaded photos.
     */
    public function store(StoreOrderRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $template = Template::where('slug', $validated['template_slug'])->firstOrFail();

        $orderRef = 'DNV-'.date('ym').'-'.strtoupper(substr(uniqid(), -4));

        $order = DB::transaction(function () use ($validated, $template, $orderRef, $request) {
            $newOrder = Order::create([
                'order_ref' => $orderRef,
                'template_id' => $template->id,
                'template_name' => $template->name,
                'package_price' => $template->price,
                'total_payment' => $template->price,
                'customer_name' => $validated['customer_name'],
                'customer_whatsapp' => $validated['customer_whatsapp'],
                'customer_email' => $validated['customer_email'] ?? null,
                'groom_nickname' => $validated['groom_nickname'],
                'groom_full_name' => $validated['groom_full_name'],
                'groom_parents' => $validated['groom_parents'] ?? null,
                'bride_nickname' => $validated['bride_nickname'],
                'bride_full_name' => $validated['bride_full_name'],
                'bride_parents' => $validated['bride_parents'] ?? null,
                'wedding_date' => $validated['wedding_date'],
                'events' => $validated['events'],
                'payment_status' => 'pending',
                'production_status' => 'queued',
                'customer_notes' => $validated['customer_notes'] ?? null,
            ]);

            // Save Main Couple Photo if uploaded
            if ($request->hasFile('main_photo')) {
                $mainFile = $request->file('main_photo');
                $mainPath = $mainFile->store("orders/{$orderRef}", 'public');

                OrderFile::create([
                    'order_id' => $newOrder->id,
                    'file_type' => 'main_photo',
                    'file_path' => $mainPath,
                    'file_name' => $mainFile->getClientOriginalName(),
                    'file_size' => $mainFile->getSize(),
                    'mime_type' => $mainFile->getClientMimeType(),
                ]);
            }

            // Save Gallery Photos if uploaded
            if ($request->hasFile('gallery_photos')) {
                foreach ($request->file('gallery_photos') as $gFile) {
                    $gPath = $gFile->store("orders/{$orderRef}", 'public');

                    OrderFile::create([
                        'order_id' => $newOrder->id,
                        'file_type' => 'gallery_photo',
                        'file_path' => $gPath,
                        'file_name' => $gFile->getClientOriginalName(),
                        'file_size' => $gFile->getSize(),
                        'mime_type' => $gFile->getClientMimeType(),
                    ]);
                }
            }

            return $newOrder;
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Pesanan berhasil dibuat.',
            'data' => $order->load(['template', 'files']),
        ], 201);
    }

    /**
     * Get order details by order reference number.
     */
    public function show(string $orderRef): JsonResponse
    {
        $order = Order::with(['template', 'files'])
            ->where('order_ref', $orderRef)
            ->firstOrFail();

        return response()->json([
            'status' => 'success',
            'data' => $order,
        ]);
    }

    /**
     * Upload payment proof receipt for an order.
     */
    public function uploadProof(Request $request, string $orderRef): JsonResponse
    {
        $request->validate([
            'proof_file' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
        ]);

        $order = Order::where('order_ref', $orderRef)->firstOrFail();

        $file = $request->file('proof_file');
        $path = $file->store("orders/{$orderRef}/proofs", 'public');

        $orderFile = OrderFile::create([
            'order_id' => $order->id,
            'file_type' => 'payment_proof',
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
            'file_size' => $file->getSize(),
            'mime_type' => $file->getClientMimeType(),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Bukti pembayaran berhasil diunggah.',
            'data' => $orderFile,
        ]);
    }
}
