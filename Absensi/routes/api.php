<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});


//Role
Route::get('role','APIRole\RoleController@index');
Route::post('role','APIRole\RoleController@store');
Route::get('role/{id}','APIRole\RoleController@show');
Route::patch('role/{id}','APIRole\RoleController@update');
Route::delete('role/{id}','APIRole\RoleController@delete');

//Mata Pelajaran
Route::get('mata_pelajaran','APIMataPelajaran\MataPelajaranController@index');
Route::post('mata_pelajaran','APIMataPelajaran\MataPelajaranController@store');
Route::get('mata_pelajaran/{id}','APIMataPelajaran\MataPelajaranController@show');
Route::patch('mata_pelajaran/{id}','APIMataPelajaran\MataPelajaranController@update');
Route::delete('mata_pelajaran/{id}','APIMataPelajaran\MataPelajaranController@delete');

//User
Route::get('user','APIUser\UserController@index');
Route::post('user','APIUser\UserController@register');
Route::get('user/{id}','APIUser\UserController@show');
Route::patch('user/{id}','APIUser\UserController@update');
Route::delete('user/{id}','APIUser\UserController@delete');

//Sekolah
Route::get('sekolah','APISekolah\SekolahController@index');
Route::post('sekolah','APISekolah\SekolahController@store');
Route::get('sekolah/{id}','APISekolah\SekolahController@show');
Route::patch('sekolah/{id}','APISekolah\SekolahController@update');
Route::delete('sekolah/{id}','APISekolah\SekolahController@delete');

//Siswa
Route::get('siswa','APISiswa\SiswaController@index');
Route::get('listSiswa','APISiswa\SiswaController@listSiswa');
Route::post('siswa','APISiswa\SiswaController@store');
Route::get('siswa/{id}','APISiswa\SiswaController@show');
Route::patch('siswa/{id}','APISiswa\SiswaController@update');
Route::delete('siswa/{id}','APISiswa\SiswaController@delete');

//Guru
Route::get('guru','APIGuru\GuruController@index');
Route::get('listGuru','APIGuru\GuruController@listGuru');
Route::post('guru','APIGuru\GuruController@store');
Route::get('guru/{id}','APIGuru\GuruController@show');
Route::patch('guru/{id}','APIGuru\GuruController@update');
Route::delete('guru/{id}','APIGuru\GuruController@delete');

//Jenjang
Route::get('jenjang','APIJenjang\JenjangController@index');
Route::post('jenjang','APIJenjang\JenjangController@store');
Route::get('jenjang/{id}','APIJenjang\JenjangController@show');
Route::patch('jenjang/{id}','APIJenjang\JenjangController@update');
Route::delete('jenjang/{id}','APIJenjang\JenjangController@delete');
Route::get('jenjang/{id}/jenjang_sekolah', 'APIJenjang\JenjangController@jenjang_sekolah');

//Tingkat
Route::get('tingkat','APITingkat\TingkatController@index');
Route::get('tingkat/{id}/tingkat_jenjang', 'APITingkat\TingkatController@tingkat_jenjang');
Route::get('tingkat/{id}', 'APITingkat\TingkatController@show');
Route::patch('tingkat/{id}','APITingkat\TingkatController@update');
//Route::post('tingkat','APITingkat\TingkatController@store');
Route::post('tingkat','APITingkat\TingkatController@add');


//Tahun Ajaran
Route::get('tahun_ajaran','APITahunAjaran\TahunAjaranController@index');
Route::post('tahun_ajaran','APITahunAjaran\TahunAjaranController@store');

//Kelas
Route::get('kelas','APIKelas\KelasController@index');
Route::get('kelas/{id}/kelas_tingkat', 'APIKelas\KelasController@kelas_tingkat');
Route::post('kelas','APIKelas\KelasController@store');
Route::get('kelas/{id}','APIKelas\KelasController@show');
Route::patch('kelas/{id}','APIKelas\KelasController@update');

//Jadwal
Route::get('jadwal/{id}/jadwal_kelas', 'APIJadwal\JadwalController@jadwal_kelas');
Route::post('jadwal','APIJadwal\JadwalController@store');
Route::get('jadwal/{id}','APIJadwal\JadwalController@show');
Route::get('jadwal','APIJadwal\JadwalController@index');
Route::patch('jadwal/{id}','APIJadwal\JadwalController@update');
Route::delete('jadwal/{id}','APIJadwal\JadwalController@delete');

//Siswa_Kelas
Route::get('siswa_kelas/{id}/siswa_kelas','APISiswaKelas\SiswaKelasController@siswa_kelas');
Route::post('siswa_kelas','APISiswaKelas\SiswaKelasController@store');
Route::delete('siswa_kelas/{id}','APISiswaKelas\SiswaKelasController@delete');

//Guru_Sekolah
Route::get('guru_sekolah/{id}/guru_sekolah','APIGuruSekolah\GuruSekolahController@guru_sekolah');
Route::post('guru_sekolah','APIGuruSekolah\GuruSekolahController@store');
Route::delete('guru_sekolah/{id}','APIGuruSekolah\GuruSekolahController@delete');

//Finger_Print
Route::get('fingerprint','APIFingerPrint\FingerPrintController@index');
Route::get('fingerprint/listFingerPrintSiswa','APIFingerPrint\FingerPrintController@listFingerPrintSiswa');
Route::get('fingerprint/listFingerPrintGuru','APIFingerPrint\FingerPrintController@listFingerPrintGuru');
Route::get('fingerprint/{fingerprint}/search','APIFingerPrint\FingerPrintController@search');
Route::post('fingerprint','APIFingerPrint\FingerPrintController@store');
Route::patch('fingerprint/{id}','APIFingerPrint\FingerPrintController@update');
Route::delete('fingerprint/{id}','APIFingerPrint\FingerPrintController@delete');
Route::get('fingerprint/{id}','APIFingerPrint\FingerPrintController@show');

//Guru_Jadwal
Route::post('guru_jadwal','APIGuruJadwal\GuruJadwalController@store');

//Absensi
Route::get('absensi/{id}','APIAbsensi\AbsensiController@show');
Route::patch('absensi/{id}','APIAbsensi\AbsensiController@update');
Route::post('absensi','APIAbsensi\AbsensiController@store');
Route::post('absensi/absen','APIAbsensi\AbsensiController@absen');
