<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Bureau;
use App\Models\Fonctionnaire;
use App\Models\Categorie;
use App\Models\Article;
use App\Models\Transfert;

class TestDataSeeder extends Seeder
{
    public function run(): void
    {
        // Delete existing data without truncating
        Transfert::query()->delete();
        Article::query()->delete();
        Fonctionnaire::query()->delete();
        Bureau::query()->delete();
        Categorie::query()->delete();

        // Reset auto-increment
        DB::statement('ALTER TABLE categories AUTO_INCREMENT = 1');
        DB::statement('ALTER TABLE articles AUTO_INCREMENT = 1');
        DB::statement('ALTER TABLE bureaux AUTO_INCREMENT = 1');
        DB::statement('ALTER TABLE fonctionnaires AUTO_INCREMENT = 1');
        DB::statement('ALTER TABLE transferts AUTO_INCREMENT = 1');

        // Create Bureaux
        $bureaux = [
            ['nom' => 'Bureau d\'Ordre'],
            ['nom' => 'مكتب الموارد البشرية'],
            ['nom' => 'مكتب التعمير'],
            ['nom' => 'مكتب الشبكات'],
            ['nom' => 'مكتب الإنارة العمومية'],
            ['nom' => 'مكتب الحالة المدنية'],
            ['nom' => 'مكتب المصادقة على الوثائق'],
            ['nom' => 'مكتب الشؤون الاقتصادية'],
            ['nom' => 'مكتب الشؤون الاجتماعية'],
            ['nom' => 'مكتب الصيانة والخدمات'],
            ['nom' => 'مكتب البيئة'],
            ['nom' => 'مكتب الثقافة والرياضة'],
            ['nom' => 'مكتب التخطيط'],
        ];

        foreach ($bureaux as $b) {
            Bureau::create($b);
        }
        $this->command->info('✅ ' . count($bureaux) . ' bureaux créés');

        // Create Fonctionnaires
        $fonctionnaires = [
            ['nom' => 'Alami', 'prenom' => 'Mohammed', 'bureau_id' => 1],
            ['nom' => 'Benali', 'prenom' => 'Fatima', 'bureau_id' => 2],
            ['nom' => 'Chraibi', 'prenom' => 'Youssef', 'bureau_id' => 3],
            ['nom' => 'Daoudi', 'prenom' => 'Karima', 'bureau_id' => 4],
            ['nom' => 'El Amrani', 'prenom' => 'Hassan', 'bureau_id' => 5],
            ['nom' => 'Fassi', 'prenom' => 'Nadia', 'bureau_id' => 6],
            ['nom' => 'Gharbi', 'prenom' => 'Omar', 'bureau_id' => 7],
            ['nom' => 'Haddad', 'prenom' => 'Sofia', 'bureau_id' => 8],
            ['nom' => 'Idrissi', 'prenom' => 'Rachid', 'bureau_id' => 9],
            ['nom' => 'Jilali', 'prenom' => 'Amina', 'bureau_id' => 10],
            ['nom' => 'Kettani', 'prenom' => 'Amine', 'bureau_id' => 11],
            ['nom' => 'Lahlou', 'prenom' => 'Sara', 'bureau_id' => 12],
            ['nom' => 'Othmani', 'prenom' => 'Saad', 'bureau_id' => 13],
        ];

        foreach ($fonctionnaires as $f) {
            Fonctionnaire::create($f);
        }
        $this->command->info('✅ ' . count($fonctionnaires) . ' fonctionnaires créés');

        // Create Categories
        $categories = [
            ['nom' => 'ÉQUIPEMENT INFORMATIQUE'],
            ['nom' => 'ÉQUIPEMENT'],
            ['nom' => 'FOURNITURE BUREAUTIQUE'],
            ['nom' => 'MATÉRIEL TECHNIQUE'],
            ['nom' => 'IMPRESSION ET CONSOMMABLES'],
            ['nom' => 'ACCESSOIRES ET PÉRIPHÉRIQUES'],
            ['nom' => 'MOBILIER D\'ACCUEIL'],
        ];

        foreach ($categories as $c) {
            Categorie::create($c);
        }
        $this->command->info('✅ ' . count($categories) . ' catégories créées');

        // Create Articles
        $articles = [
            // ÉQUIPEMENT INFORMATIQUE (categorie_id = 1)
            ['categorie_id' => 1, 'nom' => 'PC Dell Optiplex', 'description' => 'Ordinateur de bureau avec écran 24"', 'reference_bc_ao' => 'BC-2025-001', 'quantite_entree' => 10, 'date_entree' => '2025-09-30'],
            ['categorie_id' => 1, 'nom' => 'Imprimante HP LaserJet', 'description' => 'Imprimante laser noir et blanc', 'reference_bc_ao' => 'BC-2025-012', 'quantite_entree' => 5, 'date_entree' => '2025-10-15'],
            ['categorie_id' => 1, 'nom' => 'Écran 24" Samsung', 'description' => 'Écran LED Full HD', 'reference_bc_ao' => 'BC-2025-018', 'quantite_entree' => 8, 'date_entree' => '2025-11-05'],
            // ÉQUIPEMENT (categorie_id = 2)
            ['categorie_id' => 2, 'nom' => 'Armoire métallique', 'description' => 'Armoire de rangement 2 portes', 'reference_bc_ao' => 'BC-2025-045', 'quantite_entree' => 4, 'date_entree' => '2025-12-01'],
            ['categorie_id' => 2, 'nom' => 'Bureau directeur', 'description' => 'Bureau en bois 160cm', 'reference_bc_ao' => 'BC-2025-046', 'quantite_entree' => 6, 'date_entree' => '2025-12-01'],
            ['categorie_id' => 2, 'nom' => 'Chaise de bureau', 'description' => 'Chaise ergonomique', 'reference_bc_ao' => 'BC-2025-047', 'quantite_entree' => 15, 'date_entree' => '2025-12-01'],
            // FOURNITURE BUREAUTIQUE (categorie_id = 3)
            ['categorie_id' => 3, 'nom' => 'Ramettes A4 80g', 'description' => 'Papier blanc 500 feuilles', 'reference_bc_ao' => 'BC-2026-003', 'quantite_entree' => 50, 'date_entree' => '2026-01-10'],
            ['categorie_id' => 3, 'nom' => 'Stylos Bic bleu', 'description' => 'Boîte de 50 stylos', 'reference_bc_ao' => 'BC-2026-004', 'quantite_entree' => 20, 'date_entree' => '2026-01-10'],
            ['categorie_id' => 3, 'nom' => 'Agendas 2026', 'description' => 'Agendas de bureau', 'reference_bc_ao' => 'BC-2026-005', 'quantite_entree' => 30, 'date_entree' => '2026-01-15'],
            // MATÉRIEL TECHNIQUE (categorie_id = 4)
            ['categorie_id' => 4, 'nom' => 'Perceuse électrique', 'description' => 'Perceuse sans fil 18V', 'reference_bc_ao' => 'BC-2026-010', 'quantite_entree' => 3, 'date_entree' => '2026-02-01'],
            ['categorie_id' => 4, 'nom' => 'Échelle aluminium', 'description' => 'Échelle 6 marches', 'reference_bc_ao' => 'BC-2026-011', 'quantite_entree' => 2, 'date_entree' => '2026-02-01'],
            // NOUVEAUX ARTICLES (ajoutés ultérieurement)
            ['categorie_id' => 1, 'nom' => 'Souris sans fil Logitech', 'description' => 'Souris optique sans fil', 'reference_bc_ao' => 'BC-2025-020', 'quantite_entree' => 20, 'date_entree' => '2025-11-10'],
            ['categorie_id' => 2, 'nom' => 'Table de réunion', 'description' => 'Table ovale pour 8 personnes', 'reference_bc_ao' => 'BC-2025-050', 'quantite_entree' => 2, 'date_entree' => '2025-12-15'],
            ['categorie_id' => 3, 'nom' => 'Chemises cartonnées', 'description' => 'Lot de 100 chemises', 'reference_bc_ao' => 'BC-2026-008', 'quantite_entree' => 10, 'date_entree' => '2026-01-20'],
            // IMPRESSION ET CONSOMMABLES (categorie_id = 5)
            ['categorie_id' => 5, 'nom' => 'Cartouche encre Laser noir', 'description' => 'Cartouche haute capacité', 'reference_bc_ao' => 'BC-2026-030', 'quantite_entree' => 15, 'date_entree' => '2026-03-01'],
            ['categorie_id' => 5, 'nom' => 'Toner photocopieur', 'description' => 'Toner pour copieur central', 'reference_bc_ao' => 'BC-2026-031', 'quantite_entree' => 6, 'date_entree' => '2026-03-05'],
            // ACCESSOIRES ET PÉRIPHÉRIQUES (categorie_id = 6)
            ['categorie_id' => 6, 'nom' => 'Clavier azerty standard', 'description' => 'Clavier filaire USB', 'reference_bc_ao' => 'BC-2026-040', 'quantite_entree' => 20, 'date_entree' => '2026-03-10'],
            ['categorie_id' => 6, 'nom' => 'Casque téléphonique', 'description' => 'Casque pour standard téléphonique', 'reference_bc_ao' => 'BC-2026-041', 'quantite_entree' => 8, 'date_entree' => '2026-03-10'],
            // MOBILIER D'ACCUEIL (categorie_id = 7)
            ['categorie_id' => 7, 'nom' => 'Bancs d\'attente 3 places', 'description' => 'Banc inox pour accueil', 'reference_bc_ao' => 'BC-2026-050', 'quantite_entree' => 5, 'date_entree' => '2026-03-15'],
        ];

        foreach ($articles as $a) {
            Article::create($a);
        }
        $this->command->info('✅ ' . count($articles) . ' articles créés');

        // Create Transferts
        $transferts = [
            ['article_id' => 1, 'bureau_id' => 1, 'fonctionnaire_id' => 1, 'quantite' => 2, 'date_transfert' => '2026-02-23', 'remarques' => 'Pour le bureau d\'ordre'],
            ['article_id' => 1, 'bureau_id' => 2, 'fonctionnaire_id' => 2, 'quantite' => 1, 'date_transfert' => '2026-03-10', 'remarques' => 'Pour le service RH'],
            ['article_id' => 2, 'bureau_id' => 3, 'fonctionnaire_id' => 3, 'quantite' => 1, 'date_transfert' => '2026-03-15', 'remarques' => 'Imprimante pour le bureau technique'],
            ['article_id' => 3, 'bureau_id' => 4, 'fonctionnaire_id' => 4, 'quantite' => 2, 'date_transfert' => '2026-03-18', 'remarques' => 'Écrans pour le service réseaux'],
            ['article_id' => 4, 'bureau_id' => 5, 'fonctionnaire_id' => 5, 'quantite' => 1, 'date_transfert' => '2026-03-20', 'remarques' => 'Armoire pour le service éclairage'],
            ['article_id' => 6, 'bureau_id' => 1, 'fonctionnaire_id' => 1, 'quantite' => 3, 'date_transfert' => '2026-03-22', 'remarques' => 'Chaises pour bureau d\'ordre'],
            ['article_id' => 7, 'bureau_id' => 2, 'fonctionnaire_id' => 2, 'quantite' => 10, 'date_transfert' => '2026-03-25', 'remarques' => 'Papeterie RH'],
            ['article_id' => 8, 'bureau_id' => 3, 'fonctionnaire_id' => 3, 'quantite' => 5, 'date_transfert' => '2026-03-25', 'remarques' => 'Stylos bureau technique'],
            // Nouveaux transferts
            ['article_id' => 12, 'bureau_id' => 1, 'fonctionnaire_id' => 1, 'quantite' => 2, 'date_transfert' => '2026-03-28', 'remarques' => 'Deux souris sans fil'],
            ['article_id' => 13, 'bureau_id' => 11, 'fonctionnaire_id' => 11, 'quantite' => 1, 'date_transfert' => '2026-04-01', 'remarques' => 'Table de réunion pour bureau de l\'environnement'],
            ['article_id' => 14, 'bureau_id' => 12, 'fonctionnaire_id' => 12, 'quantite' => 2, 'date_transfert' => '2026-04-05', 'remarques' => 'Chemises pour bureau de la culture'],
        ];

        foreach ($transferts as $t) {
            $t['reference_br'] = Transfert::genererReference();
            Transfert::create($t);
        }
        $this->command->info('✅ ' . count($transferts) . ' transferts créés');

        $this->command->info("\n🎉 DONNÉES INSÉRÉES AVEC SUCCÈS !");
        $this->command->info("📊 Résumé:");
        $this->command->info("   - Bureaux: " . Bureau::count());
        $this->command->info("   - Fonctionnaires: " . Fonctionnaire::count());
        $this->command->info("   - Catégories: " . Categorie::count());
        $this->command->info("   - Articles: " . Article::count());
        $this->command->info("   - Transferts: " . Transfert::count());
    }
}
