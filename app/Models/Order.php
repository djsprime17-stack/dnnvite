<?php

namespace App\Models;

use Database\Factories\OrderFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'order_ref',
    'template_id',
    'template_name',
    'package_price',
    'total_payment',
    'customer_name',
    'customer_whatsapp',
    'customer_email',
    'groom_nickname',
    'groom_full_name',
    'groom_parents',
    'bride_nickname',
    'bride_full_name',
    'bride_parents',
    'wedding_date',
    'events',
    'payment_status',
    'production_status',
    'internal_notes',
    'customer_notes',
])]
class Order extends Model
{
    /** @use HasFactory<OrderFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'package_price' => 'decimal:2',
            'total_payment' => 'decimal:2',
            'wedding_date' => 'date',
            'events' => 'array',
        ];
    }

    /**
     * Template associated with the order.
     */
    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }

    /**
     * Files associated with the order (photos, payment proof).
     */
    public function files(): HasMany
    {
        return $this->hasMany(OrderFile::class);
    }
}
