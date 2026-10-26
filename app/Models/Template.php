<?php

namespace App\Models;

use Database\Factories\TemplateFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'slug',
    'name',
    'category',
    'tag',
    'price',
    'original_price',
    'cover_image',
    'description',
    'features',
    'theme',
    'details',
    'is_active',
])]
class Template extends Model
{
    /** @use HasFactory<TemplateFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'original_price' => 'decimal:2',
            'features' => 'array',
            'theme' => 'array',
            'details' => 'array',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Orders associated with this template.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
