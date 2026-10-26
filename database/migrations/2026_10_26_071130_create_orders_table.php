<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_ref')->unique();
            $table->foreignId('template_id')->nullable()->constrained('templates')->nullOnDelete();
            $table->string('template_name');
            $table->decimal('package_price', 12, 2);
            $table->decimal('total_payment', 12, 2);

            // Customer
            $table->string('customer_name');
            $table->string('customer_whatsapp');
            $table->string('customer_email')->nullable();

            // Couple
            $table->string('groom_nickname');
            $table->string('groom_full_name');
            $table->string('groom_parents')->nullable();
            $table->string('bride_nickname');
            $table->string('bride_full_name');
            $table->string('bride_parents')->nullable();
            $table->date('wedding_date');

            // Events json
            $table->json('events');

            // Statuses
            $table->string('payment_status')->default('pending'); // pending, verified, cancelled
            $table->string('production_status')->default('queued'); // queued, in_progress, ready, completed
            $table->text('internal_notes')->nullable();
            $table->text('customer_notes')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
