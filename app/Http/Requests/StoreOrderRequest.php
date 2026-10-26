<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_whatsapp' => ['required', 'string', 'max:30'],
            'customer_email' => ['nullable', 'email', 'max:255'],
            'template_slug' => ['required', 'string', 'exists:templates,slug'],
            'groom_nickname' => ['required', 'string', 'max:100'],
            'groom_full_name' => ['required', 'string', 'max:255'],
            'groom_parents' => ['nullable', 'string', 'max:255'],
            'bride_nickname' => ['required', 'string', 'max:100'],
            'bride_full_name' => ['required', 'string', 'max:255'],
            'bride_parents' => ['nullable', 'string', 'max:255'],
            'wedding_date' => ['required', 'date'],
            'events' => ['required', 'array'],
            'events.akad' => ['required', 'array'],
            'events.akad.venue' => ['required', 'string', 'max:255'],
            'events.resepsi' => ['required', 'array'],
            'events.resepsi.venue' => ['required', 'string', 'max:255'],
            'customer_notes' => ['nullable', 'string', 'max:1000'],
            'main_photo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'gallery_photos' => ['nullable', 'array', 'max:5'],
            'gallery_photos.*' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
        ];
    }
}
