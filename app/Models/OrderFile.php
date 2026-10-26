<?php

namespace App\Models;

use Database\Factories\OrderFileFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'order_id',
    'file_type',
    'file_path',
    'file_name',
    'file_size',
    'mime_type',
])]
class OrderFile extends Model
{
    /** @use HasFactory<OrderFileFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'file_size' => 'integer',
        ];
    }

    /**
     * Order associated with this file.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
