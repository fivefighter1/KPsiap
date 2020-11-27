<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTahunAjaransTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tahun_ajarans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('tahun_ajaran');
            $table->string('angkatan');
            $table->timestamps();
        });

        Schema::table('kelas', function(Blueprint $table){
            $table->unsignedBigInteger('tahun_ajaran_id');
            $table->foreign('tahun_ajaran_id')->references('id')->on('tahun_ajarans')
                ->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('kelas',function(Blueprint $table){
            $table->dropForeign('kelas_tahun_ajaran_id_foreign');

        });
        Schema::dropIfExists('tahun_ajarans');
    }
}
