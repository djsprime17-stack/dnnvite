<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TemplateController extends Controller
{
    /**
     * List all templates including inactive ones for administration.
     */
    public function index(): JsonResponse
    {
        $templates = Template::latest()->get();

        return response()->json([
            'status' => 'success',
            'data' => $templates,
        ]);
    }

    /**
     * Create a new template.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'tag' => ['nullable', 'string', 'max:50'],
            'price' => ['required', 'numeric', 'min:0'],
            'original_price' => ['nullable', 'numeric', 'min:0'],
            'cover_image' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'features' => ['nullable', 'array'],
            'is_active' => ['boolean'],
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        // Prevent duplicate slug
        $originalSlug = $validated['slug'];
        $count = 1;
        while (Template::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = "{$originalSlug}-{$count}";
            $count++;
        }

        $template = Template::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Template berhasil ditambahkan.',
            'data' => $template,
        ], 201);
    }

    /**
     * Update existing template details.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $template = Template::findOrFail($id);

        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'category' => ['sometimes', 'required', 'string', 'max:100'],
            'tag' => ['nullable', 'string', 'max:50'],
            'price' => ['sometimes', 'required', 'numeric', 'min:0'],
            'original_price' => ['nullable', 'numeric', 'min:0'],
            'cover_image' => ['sometimes', 'required', 'string'],
            'description' => ['nullable', 'string'],
            'features' => ['nullable', 'array'],
            'is_active' => ['boolean'],
        ]);

        $template->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Template berhasil diperbarui.',
            'data' => $template,
        ]);
    }

    /**
     * Toggle active/inactive state of a template.
     */
    public function toggle(int $id): JsonResponse
    {
        $template = Template::findOrFail($id);
        $template->update(['is_active' => ! $template->is_active]);

        return response()->json([
            'status' => 'success',
            'message' => 'Status publikasi template berhasil diubah.',
            'data' => $template,
        ]);
    }
}
