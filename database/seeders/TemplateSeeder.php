<?php

namespace Database\Seeders;

use App\Models\Template;
use Illuminate\Database\Seeder;

class TemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $templates = [
            [
                'slug' => 'amora-serenade',
                'name' => 'Amora Serenade',
                'category' => 'Modern Minimalis',
                'tag' => 'Paling Populer',
                'price' => 149000.00,
                'original_price' => 199000.00,
                'cover_image' => 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
                'description' => 'Sentuhan tipografi editorial modern dengan palet warna alabaster dan aksen bronze yang abadi.',
                'features' => ['Cinematic Opening', 'Galeri 12 Foto', 'RSVP & Ucapan Real-time', 'Musik Romantis'],
                'theme' => [
                    'bg' => '#FAF8F5',
                    'cardBg' => '#FFFFFF',
                    'text' => '#1A1817',
                    'muted' => '#6E6864',
                    'accent' => '#8C6D46',
                    'accentHover' => '#745834',
                    'border' => '#E5DDD0',
                    'fontDisplay' => 'font-serif',
                ],
                'details' => [
                    'groom' => ['nickname' => 'Raden', 'fullName' => 'Raden Arya Wicaksana, S.T.'],
                    'bride' => ['nickname' => 'Andini', 'fullName' => 'Andini Putri Maharani, M.Ds.'],
                    'weddingDate' => '2026-11-28',
                ],
                'is_active' => true,
            ],
            [
                'slug' => 'larasati-heritage',
                'name' => 'Larasati Heritage',
                'category' => 'Traditional Royalty',
                'tag' => 'Nuansa Nusantara',
                'price' => 169000.00,
                'original_price' => 229000.00,
                'cover_image' => 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
                'description' => 'Paduan keanggunan motif klasik warisan nusantara dengan balutan tata letak kontemporer yang agung.',
                'features' => ['Ornamen Etnik Eksklusif', 'Kisah Cinta Interaktif', 'Google Maps Terintegrasi', 'Amplop Digital Cashless'],
                'theme' => [
                    'bg' => '#FDFBF7',
                    'cardBg' => '#FFFFFF',
                    'text' => '#2C1D11',
                    'muted' => '#7A624E',
                    'accent' => '#B8860B',
                    'accentHover' => '#996E06',
                    'border' => '#E8DFD3',
                    'fontDisplay' => 'font-serif',
                ],
                'details' => [
                    'groom' => ['nickname' => 'Kresna', 'fullName' => 'Kresna Dananjaya, S.H.'],
                    'bride' => ['nickname' => 'Larasati', 'fullName' => 'Larasati Sekar Wangi, S.E.'],
                    'weddingDate' => '2026-12-12',
                ],
                'is_active' => true,
            ],
            [
                'slug' => 'aura-botanical',
                'name' => 'Aura Botanical',
                'category' => 'Romantic Floral',
                'tag' => 'Favorit Pasangan',
                'price' => 149000.00,
                'original_price' => 199000.00,
                'cover_image' => 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
                'description' => 'Aksen dedaunan sage lembut dan ilustrasi flora organik yang memancarkan keteduhan dan keintiman.',
                'features' => ['Animasi Flora Halus', 'Hitung Mundur Waktu Nyata', 'Panduan Protokol Acara', 'Buku Tamu Digital'],
                'theme' => [
                    'bg' => '#F5F7F5',
                    'cardBg' => '#FFFFFF',
                    'text' => '#1C2920',
                    'muted' => '#5A6E60',
                    'accent' => '#3E5C46',
                    'accentHover' => '#2E4434',
                    'border' => '#DAE2DC',
                    'fontDisplay' => 'font-serif',
                ],
                'details' => [
                    'groom' => ['nickname' => 'Julian', 'fullName' => 'Julian Pratama, B.Eng.'],
                    'bride' => ['nickname' => 'Clara', 'fullName' => 'Clara Aurelia, S.I.Kom.'],
                    'weddingDate' => '2026-10-18',
                ],
                'is_active' => true,
            ],
            [
                'slug' => 'noir-opulence',
                'name' => 'Noir Opulence',
                'category' => 'Luxury Classic',
                'tag' => 'Eksklusif',
                'price' => 189000.00,
                'original_price' => 249000.00,
                'cover_image' => 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=80',
                'description' => 'Latar hitam arang pekat dengan sentuhan aksen emas sampanye untuk pernikahan malam yang berkelas.',
                'features' => ['Tema Dark Mode Mewah', 'Pratinjau Video Teaser', 'Multiple Event Sesi', 'Konfirmasi WhatsApp Langsung'],
                'theme' => [
                    'bg' => '#141414',
                    'cardBg' => '#1E1E1E',
                    'text' => '#F5F5F5',
                    'muted' => '#A3A3A3',
                    'accent' => '#D4AF37',
                    'accentHover' => '#B59428',
                    'border' => '#2E2E2E',
                    'fontDisplay' => 'font-serif',
                ],
                'details' => [
                    'groom' => ['nickname' => 'Alexander', 'fullName' => 'Alexander Richard Wijaya'],
                    'bride' => ['nickname' => 'Gisella', 'fullName' => 'Gisella Natasha Hartono'],
                    'weddingDate' => '2026-11-14',
                ],
                'is_active' => true,
            ],
        ];

        foreach ($templates as $t) {
            Template::updateOrCreate(['slug' => $t['slug']], $t);
        }
    }
}
