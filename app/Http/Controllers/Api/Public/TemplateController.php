<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TemplateController extends Controller
{
    /**
     * List all active templates with optional filtering.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Template::query()->where('is_active', true);

        if ($request->filled('category') && $request->query('category') !== 'Semua') {
            $query->where('category', $request->query('category'));
        }

        if ($request->filled('search')) {
            $search = $request->query('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->query('sort') === 'price-low') {
            $query->orderBy('price', 'asc');
        } elseif ($request->query('sort') === 'price-high') {
            $query->orderBy('price', 'desc');
        } else {
            $query->orderBy('id', 'asc');
        }

        $templates = $query->get();

        return response()->json([
            'status' => 'success',
            'data' => $templates,
        ]);
    }

    /**
     * Show single template by slug.
     */
    public function show(string $slug): JsonResponse
    {
        $template = Template::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return response()->json([
            'status' => 'success',
            'data' => $template,
        ]);
    }
}
