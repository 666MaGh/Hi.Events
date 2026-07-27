<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('event_settings', static function (Blueprint $table) {
            $table->string('swish_number', 20)->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('event_settings', static function (Blueprint $table) {
            $table->dropColumn('swish_number');
        });
    }
};
