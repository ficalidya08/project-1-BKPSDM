<template>
  <div
    class="min-h-screen bg-cover bg-center flex flex-col items-center px-6 py-10"
    style="background-image: url('/src/assets/images/bg-navy.png')"
  >
    <!-- Tombol kembali pojok kiri atas -->
    <router-link 
      to="/" 
      class="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md text-gray-800 hover:bg-gray-100 transition"
    >
      <svg xmlns="http://www.w3.org/2000/svg" 
           fill="none" 
           viewBox="0 0 24 24" 
           stroke-width="2" 
           stroke="currentColor" 
           class="w-6 h-6">
        <path stroke-linecap="round" 
              stroke-linejoin="round" 
              d="M15 19l-7-7 7-7" />
      </svg>
      <span class="text-base font-medium">Kembali ke Home</span>
    </router-link>

    <!-- Container logo -->
    <div class="flex items-center justify-center gap-2">
      <img src="@/assets/images/logo/bkpsdm.png" alt="Logo BKPSDM" class="h-[70px] w-auto" />
      <img src="@/assets/images/logo/logo.png" alt="Logo Utama" class="h-[140px] w-auto" />
    </div>

    <!-- Judul -->
    <div class="text-center text-white mb-8">
      <h1 class="text-4xl font-katalog font-bold tracking-wide mb-1">KATALOG</h1>
      <p class="text-2xl font-serif">
        Direktori Lengkap Program Pelatihan dan Pengembangan SDM
      </p>
    </div>

    <!-- Kontainer Tabel -->
    <div class="bg-white shadow-xl rounded-xl w-full max-w-6xl overflow-hidden font-inter">
      
      <!-- Filter Atas (Search) -->
      <div class="flex justify-end p-4 border-b border-gray-200">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          class="border border-gray-300 rounded-lg px-3 py-1 text-sm w-60"
        />
      </div>

      <!-- Tabel -->
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-left">
          <thead class="bg-gray-100 text-gray-700 text-xs uppercase">
            <tr>
              <th class="px-4 py-3">No</th>
              <th class="px-4 py-3">Nama Pelatihan</th>
              <th class="px-4 py-3">Pengertian</th>
              <th class="px-4 py-3">Tujuan</th>
              <th class="px-4 py-3">Penyelenggara</th>
              <th class="px-4 py-3">Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in paginatedData"
              :key="item.id"
              class="border-b"
            >
              <td class="px-4 py-3">
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>
              <td class="px-4 py-3 font-semibold text-blue-600">
                {{ item.nama }}
              </td>
              <td class="px-4 py-3">{{ item.pengertianRingkas }}</td>
              <td class="px-4 py-3">{{ item.tujuanRingkas }}</td>
              <td class="px-4 py-3">{{ item.penyelenggara }}</td>
              <td class="px-4 py-2">
                <button
                  class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  @click="openDetail(item)"
                >
                  Detail
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer Pagination -->
      <div class="flex justify-between items-center px-4 py-3 border-t text-sm text-gray-600">
        <span>
          Showing 
          {{ (currentPage - 1) * itemsPerPage + 1 }} 
          to 
          {{ Math.min(currentPage * itemsPerPage, filteredData.length) }} 
          of {{ filteredData.length }} entries
        </span>

        <div class="flex space-x-2">
          <button 
            class="px-3 py-1 border rounded-lg hover:bg-gray-100"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            &lt;
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            class="px-3 py-1 border rounded-lg"
            :class="page === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'"
            @click="currentPage = page"
          >
            {{ page }}
          </button>

          <button 
            class="px-3 py-1 border rounded-lg hover:bg-gray-100"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Detail -->
<div
  v-if="showModal"
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
>
  <div
  class="bg-white w-full max-w-5xl rounded-3xl shadow-2xl p-8 relative max-h-[90vh]"
>
    <!-- Tombol Close -->
  <button
    @click="showModal = false"
    class="sticky top-1 float-right text-gray-400 hover:text-gray-700 text-xl z-10"
  >
    ✕
  </button>
    <div class="overflow-y-auto max-h-[80vh] pr-2">
    <!-- Judul -->
    <h2 class="text-2xl font-bold mb-6 text-gray-800 break-words">
      {{ selected.nama }}
    </h2>

    <!-- Grid Detail -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div class="bg-red-50 p-5 rounded-xl border border-red-200">
        <div class="flex items-center gap-2 mb-2">
        <img src="@/assets/icons/Book_oren.svg" alt="Book" class="h-6 w-6" />
        <h3 class="font-semibold text-red-800">Pengertian</h3>
        </div>
        <p>{{ selected.pengertianDetail }}</p>
        </div>

      <!-- Tujuan Pelatihan -->
      <div class="bg-orange-50 p-5 rounded-xl border border-orange-200">
        <div class="flex items-center gap-2 mb-2">
        <img src="@/assets/icons/Book_oren.svg" alt="Book" class="h-6 w-6" />
        <h3 class="font-semibold text-orange-800">Tujuan Pelatihan</h3>
        </div>
        <p>{{ selected.tujuanDetail }}</p>
      </div>

      <!-- Jadwal dan Tempat -->
      <div class="bg-indigo-50 p-5 rounded-xl border border-indigo-200">
        <h3 class="font-semibold text-indigo-800">Jadwal dan Tempat</h3>
        <div class="flex items-center gap-2 mb-2">
        <img src="@/assets/icons/Kalender.svg" alt="Kalender" class="h-6 w-6" />
        <p>{{ selected.jadwal }}</p>
        <img src="@/assets/icons/Map_ungu.svg" alt="Map" class="h-6 w-6" />
        <p>{{ selected.tempat }}</p>
        </div>
      </div>

      <!-- Penyelenggara -->
      <div class="bg-purple-50 p-5 rounded-xl border border-purple-200">
        <div class="flex items-center gap-2 mb-2">
        <img src="@/assets/icons/Users.svg" alt="Users" class="h-6 w-6" />
        <h3 class="font-semibold text-purple-800">Penyelenggara</h3>
        </div>
        <p>{{ selected.penyelenggara }}</p>
      </div>

      <!-- Narasumber -->
      <div class="bg-pink-50 p-5 rounded-xl border border-pink-200">
        <div class="flex items-center gap-2 mb-2">
        <img src="@/assets/icons/User_ungu.svg" alt="User" class="h-6 w-6" />
        <h3 class="font-semibold text-purple-800">Narasumber</h3>
        </div>
        <p>{{ selected.narasumber }}</p>
      </div>

      <!-- Manfaat -->
      <div class="bg-blue-50 p-5 rounded-xl border border-blue-200">
        <div class="flex items-center gap-2 mb-2">
        <img src="@/assets/icons/File text.svg" alt="File" class="h-6 w-6" />
        <h3 class="font-semibold text-blue-800">Manfaat</h3>
        </div>
        <p>{{ selected.manfaat }}</p>
      </div>

      <!-- Isi Materi -->
      <div class="bg-green-50 p-5 rounded-xl border border-green-200">
        <div class="flex items-center gap-2 mb-2">
        <img src="@/assets/icons/Calendar.svg" alt="Calendar" class="h-6 w-6" />
        <h3 class="font-semibold text-green-800">Isi Materi Pelatihan</h3>
        </div>
        <p>{{ selected.materi }}</p>
      </div>

      <!-- Output -->
      <div class="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
        <div class="flex items-center gap-2 mb-2">
        <img src="@/assets/icons/Info.svg" alt="Info" class="h-6 w-6" />
        <h3 class="font-semibold text-yellow-800">Output Pelatihan</h3>
        </div>
        <p>{{ selected.output }}</p>
      </div>
    </div>
  </div>
  </div>
</div>


  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const showModal = ref(false);
const selected = ref({});
const searchQuery = ref("");

// --- Data Dummy ---

  const pelatihan = [
  {
    id: 1,
    nama: "Pelatihan Kepemimpinan Dasar",
    pengertianRingkas:"Pelatihan untuk membangun keterampilan kepemimpinan dasar",
    tujuanRingkas:"Pelatihan untuk pengembangan kemampuan kepemimpinan dan manajemen tim",
    jadwal: "15–20 Januari 2024",
    tempat: "Balai Kota Surakarta, Jl. Jend. Sudirman No.2, Kedung Lumbu, Solo",
    penyelenggara: "LAN (Lembaga Administrasi Negara)",
    narasumber: "Akademisi/Dosen dan Praktisi Profesional",
    manfaat: "Peserta akan dapat meningkatkan kemampuan kepemimpinan, manajemen tim, dan komunikasi.",
    tujuanDetail: "Mengembangkan kemampuan kepemimpinan dan manajemen tim yang efektif, meningkatkan kemampuan komunikasi dan motivasi, serta membangun karakter pemimpin yang inspiratif. Program ini dirancang untuk membekali para calon pemimpin dengan keterampilan fundamental dalam memimpin tim, mengelola konflik, dan menciptakan lingkungan kerja yang produktif.",
    materi: "Materi pelatihan mencakup teori dan praktik kepemimpinan, manajemen tim, komunikasi, dan motivasi.",
    pengertianDetail: "Pelatihan Kepemimpinan Dasar adalah program komprehensif yang dirancang untuk membantu peserta memahami dan mengaplikasikan prinsip-prinsip kepemimpinan fundamental. Program ini mencakup pemahaman mendalam tentang gaya kepemimpinan, psikologi tim, komunikasi efektif, dan strategi motivasi yang dapat diterapkan dalam berbagai situasi kerja.",
    output: "Peserta mampu memahami prinsip kepemimpinan, mengelola tim efektif, dan menerapkan gaya kepemimpinan sesuai situasi."
  },
  {
    id: 2,
    nama: "Pelatihan Manajemen Proyek",
    pengertianRingkas:"Pelatihan metodologi pengelolaan proyek profesional",
    tujuanRingkas:"Menguasai metodologi manajemen proyek modern",
    jadwal: "01-05 Februari 2025",
    tempat: "Virtual via Platform Online",
    penyelenggara: "BKPSDM dan Perguruan Tinggi",
    narasumber: "Pakar dan Tenaga Ahli Manajemen Proyek",
    manfaat: "Peserta akan dapat merencanakan dan mengendalikan proyek secara efektif.",
    tujuanDetail: "Menguasai metodologi manajemen proyek PMBOK dan Agile, mampu merencanakan dan mengendalikan proyek secara efektif, serta meningkatkan kemampuan leadership dalam tim proyek. Program ini memberikan pemahaman mendalam tentang lifecycle proyek, risk management, resource allocation, dan teknik monitoring yang efektif untuk memastikan keberhasilan proyek",
    materi: "Materi pelatihan mencakup teori dan praktik manajemen proyek, PMBOK, Agile, dan leadership.",
    pengertianDetail: "Pelatihan Manajemen Proyek adalah program intensif yang bertujuan untuk membantu peserta memahami dan mengaplikasikan prinsip-prinsip manajemen proyek sesuai standar internasional. Program ini mencakup pembelajaran tentang planning, execution, monitoring, controlling, dan closing proyek dengan menggunakan framework yang telah terbukti efektif di industri global.",
    output: "Peserta mampu menguasai metodologi PMBOK dan Agile, merencanakan proyek, dan memimpin tim proyek"
  },
  {
    id: 3,
    nama: "Pelatihan Kepemimpinan Dasar",
    pengertianRingkas:"Pelatihan untuk membangun keterampilan kepemimpinan dasar",
    tujuanRingkas:"Pelatihan untuk pengembangan kemampuan kepemimpinan dan manajemen tim",
    jadwal: "15–20 Januari 2024",
    tempat: "Balai Kota Surakarta, Jl. Jend. Sudirman No.2, Kedung Lumbu, Solo",
    penyelenggara: "LAN (Lembaga Administrasi Negara)",
    narasumber: "Akademisi/Dosen dan Praktisi Profesional",
    manfaat: "Peserta akan dapat meningkatkan kemampuan kepemimpinan, manajemen tim, dan komunikasi.",
    tujuanDetail: "Mengembangkan kemampuan kepemimpinan dan manajemen tim yang efektif, meningkatkan kemampuan komunikasi dan motivasi, serta membangun karakter pemimpin yang inspiratif. Program ini dirancang untuk membekali para calon pemimpin dengan keterampilan fundamental dalam memimpin tim, mengelola konflik, dan menciptakan lingkungan kerja yang produktif.",
    materi: "Materi pelatihan mencakup teori dan praktik kepemimpinan, manajemen tim, komunikasi, dan motivasi.",
    pengertianDetail: "Pelatihan Kepemimpinan Dasar adalah program komprehensif yang dirancang untuk membantu peserta memahami dan mengaplikasikan prinsip-prinsip kepemimpinan fundamental. Program ini mencakup pemahaman mendalam tentang gaya kepemimpinan, psikologi tim, komunikasi efektif, dan strategi motivasi yang dapat diterapkan dalam berbagai situasi kerja.",
    output: "Peserta mampu memahami prinsip kepemimpinan, mengelola tim efektif, dan menerapkan gaya kepemimpinan sesuai situasi."
  },
  {
    id: 4,
    nama: "Pelatihan Manajemen Proyek",
    pengertianRingkas:"Pelatihan metodologi pengelolaan proyek profesional",
    tujuanRingkas:"Menguasai metodologi manajemen proyek modern",
    jadwal: "01-05 Februari 2025",
    tempat: "Virtual via Platform Online",
    penyelenggara: "BKPSDM dan Perguruan Tinggi",
    narasumber: "Pakar dan Tenaga Ahli Manajemen Proyek",
    manfaat: "Peserta akan dapat merencanakan dan mengendalikan proyek secara efektif.",
    tujuanDetail: "Menguasai metodologi manajemen proyek PMBOK dan Agile, mampu merencanakan dan mengendalikan proyek secara efektif, serta meningkatkan kemampuan leadership dalam tim proyek. Program ini memberikan pemahaman mendalam tentang lifecycle proyek, risk management, resource allocation, dan teknik monitoring yang efektif untuk memastikan keberhasilan proyek",
    materi: "Materi pelatihan mencakup teori dan praktik manajemen proyek, PMBOK, Agile, dan leadership.",
    pengertianDetail: "Pelatihan Manajemen Proyek adalah program intensif yang bertujuan untuk membantu peserta memahami dan mengaplikasikan prinsip-prinsip manajemen proyek sesuai standar internasional. Program ini mencakup pembelajaran tentang planning, execution, monitoring, controlling, dan closing proyek dengan menggunakan framework yang telah terbukti efektif di industri global.",
    output: "Peserta mampu menguasai metodologi PMBOK dan Agile, merencanakan proyek, dan memimpin tim proyek"
  },
  {
    id: 5,
    nama: "Pelatihan Kepemimpinan Dasar",
    pengertianRingkas:"Pelatihan untuk membangun keterampilan kepemimpinan dasar",
    tujuanRingkas:"Pelatihan untuk pengembangan kemampuan kepemimpinan dan manajemen tim",
    jadwal: "15–20 Januari 2024",
    tempat: "Balai Kota Surakarta, Jl. Jend. Sudirman No.2, Kedung Lumbu, Solo",
    penyelenggara: "LAN (Lembaga Administrasi Negara)",
    narasumber: "Akademisi/Dosen dan Praktisi Profesional",
    manfaat: "Peserta akan dapat meningkatkan kemampuan kepemimpinan, manajemen tim, dan komunikasi.",
    tujuanDetail: "Mengembangkan kemampuan kepemimpinan dan manajemen tim yang efektif, meningkatkan kemampuan komunikasi dan motivasi, serta membangun karakter pemimpin yang inspiratif. Program ini dirancang untuk membekali para calon pemimpin dengan keterampilan fundamental dalam memimpin tim, mengelola konflik, dan menciptakan lingkungan kerja yang produktif.",
    materi: "Materi pelatihan mencakup teori dan praktik kepemimpinan, manajemen tim, komunikasi, dan motivasi.",
    pengertianDetail: "Pelatihan Kepemimpinan Dasar adalah program komprehensif yang dirancang untuk membantu peserta memahami dan mengaplikasikan prinsip-prinsip kepemimpinan fundamental. Program ini mencakup pemahaman mendalam tentang gaya kepemimpinan, psikologi tim, komunikasi efektif, dan strategi motivasi yang dapat diterapkan dalam berbagai situasi kerja.",
    output: "Peserta mampu memahami prinsip kepemimpinan, mengelola tim efektif, dan menerapkan gaya kepemimpinan sesuai situasi."
  },
  {
    id: 6,
    nama: "Pelatihan Manajemen Proyek",
    pengertianRingkas:"Pelatihan metodologi pengelolaan proyek profesional",
    tujuanRingkas:"Menguasai metodologi manajemen proyek modern",
    jadwal: "01-05 Februari 2025",
    tempat: "Virtual via Platform Online",
    penyelenggara: "BKPSDM dan Perguruan Tinggi",
    narasumber: "Pakar dan Tenaga Ahli Manajemen Proyek",
    manfaat: "Peserta akan dapat merencanakan dan mengendalikan proyek secara efektif.",
    tujuanDetail: "Menguasai metodologi manajemen proyek PMBOK dan Agile, mampu merencanakan dan mengendalikan proyek secara efektif, serta meningkatkan kemampuan leadership dalam tim proyek. Program ini memberikan pemahaman mendalam tentang lifecycle proyek, risk management, resource allocation, dan teknik monitoring yang efektif untuk memastikan keberhasilan proyek",
    materi: "Materi pelatihan mencakup teori dan praktik manajemen proyek, PMBOK, Agile, dan leadership.",
    pengertianDetail: "Pelatihan Manajemen Proyek adalah program intensif yang bertujuan untuk membantu peserta memahami dan mengaplikasikan prinsip-prinsip manajemen proyek sesuai standar internasional. Program ini mencakup pembelajaran tentang planning, execution, monitoring, controlling, dan closing proyek dengan menggunakan framework yang telah terbukti efektif di industri global.",
    output: "Peserta mampu menguasai metodologi PMBOK dan Agile, merencanakan proyek, dan memimpin tim proyek"
  },
  {
    id: 7,
    nama: "Pelatihan Kepemimpinan Dasar",
    pengertianRingkas:"Pelatihan untuk membangun keterampilan kepemimpinan dasar",
    tujuanRingkas:"Pelatihan untuk pengembangan kemampuan kepemimpinan dan manajemen tim",
    jadwal: "15–20 Januari 2024",
    tempat: "Balai Kota Surakarta, Jl. Jend. Sudirman No.2, Kedung Lumbu, Solo",
    penyelenggara: "LAN (Lembaga Administrasi Negara)",
    narasumber: "Akademisi/Dosen dan Praktisi Profesional",
    manfaat: "Peserta akan dapat meningkatkan kemampuan kepemimpinan, manajemen tim, dan komunikasi.",
    tujuanDetail: "Mengembangkan kemampuan kepemimpinan dan manajemen tim yang efektif, meningkatkan kemampuan komunikasi dan motivasi, serta membangun karakter pemimpin yang inspiratif. Program ini dirancang untuk membekali para calon pemimpin dengan keterampilan fundamental dalam memimpin tim, mengelola konflik, dan menciptakan lingkungan kerja yang produktif.",
    materi: "Materi pelatihan mencakup teori dan praktik kepemimpinan, manajemen tim, komunikasi, dan motivasi.",
    pengertianDetail: "Pelatihan Kepemimpinan Dasar adalah program komprehensif yang dirancang untuk membantu peserta memahami dan mengaplikasikan prinsip-prinsip kepemimpinan fundamental. Program ini mencakup pemahaman mendalam tentang gaya kepemimpinan, psikologi tim, komunikasi efektif, dan strategi motivasi yang dapat diterapkan dalam berbagai situasi kerja.",
    output: "Peserta mampu memahami prinsip kepemimpinan, mengelola tim efektif, dan menerapkan gaya kepemimpinan sesuai situasi."
  },
  {
    id: 8,
    nama: "Pelatihan Manajemen Proyek",
    pengertianRingkas:"Pelatihan metodologi pengelolaan proyek profesional",
    tujuanRingkas:"Menguasai metodologi manajemen proyek modern",
    jadwal: "01-05 Februari 2025",
    tempat: "Virtual via Platform Online",
    penyelenggara: "BKPSDM dan Perguruan Tinggi",
    narasumber: "Pakar dan Tenaga Ahli Manajemen Proyek",
    manfaat: "Peserta akan dapat merencanakan dan mengendalikan proyek secara efektif.",
    tujuanDetail: "Menguasai metodologi manajemen proyek PMBOK dan Agile, mampu merencanakan dan mengendalikan proyek secara efektif, serta meningkatkan kemampuan leadership dalam tim proyek. Program ini memberikan pemahaman mendalam tentang lifecycle proyek, risk management, resource allocation, dan teknik monitoring yang efektif untuk memastikan keberhasilan proyek",
    materi: "Materi pelatihan mencakup teori dan praktik manajemen proyek, PMBOK, Agile, dan leadership.",
    pengertianDetail: "Pelatihan Manajemen Proyek adalah program intensif yang bertujuan untuk membantu peserta memahami dan mengaplikasikan prinsip-prinsip manajemen proyek sesuai standar internasional. Program ini mencakup pembelajaran tentang planning, execution, monitoring, controlling, dan closing proyek dengan menggunakan framework yang telah terbukti efektif di industri global.",
    output: "Peserta mampu menguasai metodologi PMBOK dan Agile, merencanakan proyek, dan memimpin tim proyek"
  },
  {
    id: 9,
    nama: "Pelatihan Kepemimpinan Dasar",
    pengertianRingkas:"Pelatihan untuk membangun keterampilan kepemimpinan dasar",
    tujuanRingkas:"Pelatihan untuk pengembangan kemampuan kepemimpinan dan manajemen tim",
    jadwal: "15–20 Januari 2024",
    tempat: "Balai Kota Surakarta, Jl. Jend. Sudirman No.2, Kedung Lumbu, Solo",
    penyelenggara: "LAN (Lembaga Administrasi Negara)",
    narasumber: "Akademisi/Dosen dan Praktisi Profesional",
    manfaat: "Peserta akan dapat meningkatkan kemampuan kepemimpinan, manajemen tim, dan komunikasi.",
    tujuanDetail: "Mengembangkan kemampuan kepemimpinan dan manajemen tim yang efektif, meningkatkan kemampuan komunikasi dan motivasi, serta membangun karakter pemimpin yang inspiratif. Program ini dirancang untuk membekali para calon pemimpin dengan keterampilan fundamental dalam memimpin tim, mengelola konflik, dan menciptakan lingkungan kerja yang produktif.",
    materi: "Materi pelatihan mencakup teori dan praktik kepemimpinan, manajemen tim, komunikasi, dan motivasi.",
    pengertianDetail: "Pelatihan Kepemimpinan Dasar adalah program komprehensif yang dirancang untuk membantu peserta memahami dan mengaplikasikan prinsip-prinsip kepemimpinan fundamental. Program ini mencakup pemahaman mendalam tentang gaya kepemimpinan, psikologi tim, komunikasi efektif, dan strategi motivasi yang dapat diterapkan dalam berbagai situasi kerja.",
    output: "Peserta mampu memahami prinsip kepemimpinan, mengelola tim efektif, dan menerapkan gaya kepemimpinan sesuai situasi."
  },
  {
    id: 10,
    nama: "Pelatihan Manajemen Proyek",
    pengertianRingkas:"Pelatihan metodologi pengelolaan proyek profesional",
    tujuanRingkas:"Menguasai metodologi manajemen proyek modern",
    jadwal: "01-05 Februari 2025",
    tempat: "Virtual via Platform Online",
    penyelenggara: "BKPSDM dan Perguruan Tinggi",
    narasumber: "Pakar dan Tenaga Ahli Manajemen Proyek",
    manfaat: "Peserta akan dapat merencanakan dan mengendalikan proyek secara efektif.",
    tujuanDetail: "Menguasai metodologi manajemen proyek PMBOK dan Agile, mampu merencanakan dan mengendalikan proyek secara efektif, serta meningkatkan kemampuan leadership dalam tim proyek. Program ini memberikan pemahaman mendalam tentang lifecycle proyek, risk management, resource allocation, dan teknik monitoring yang efektif untuk memastikan keberhasilan proyek",
    materi: "Materi pelatihan mencakup teori dan praktik manajemen proyek, PMBOK, Agile, dan leadership.",
    pengertianDetail: "Pelatihan Manajemen Proyek adalah program intensif yang bertujuan untuk membantu peserta memahami dan mengaplikasikan prinsip-prinsip manajemen proyek sesuai standar internasional. Program ini mencakup pembelajaran tentang planning, execution, monitoring, controlling, dan closing proyek dengan menggunakan framework yang telah terbukti efektif di industri global.",
    output: "Peserta mampu menguasai metodologi PMBOK dan Agile, merencanakan proyek, dan memimpin tim proyek"
  },
  {
    id: 9,
    nama: "Pelatihan Kepemimpinan Dasar",
    pengertianRingkas:"Pelatihan untuk membangun keterampilan kepemimpinan dasar",
    tujuanRingkas:"Pelatihan untuk pengembangan kemampuan kepemimpinan dan manajemen tim",
    jadwal: "15–20 Januari 2024",
    tempat: "Balai Kota Surakarta, Jl. Jend. Sudirman No.2, Kedung Lumbu, Solo",
    penyelenggara: "LAN (Lembaga Administrasi Negara)",
    narasumber: "Akademisi/Dosen dan Praktisi Profesional",
    manfaat: "Peserta akan dapat meningkatkan kemampuan kepemimpinan, manajemen tim, dan komunikasi.",
    tujuanDetail: "Mengembangkan kemampuan kepemimpinan dan manajemen tim yang efektif, meningkatkan kemampuan komunikasi dan motivasi, serta membangun karakter pemimpin yang inspiratif. Program ini dirancang untuk membekali para calon pemimpin dengan keterampilan fundamental dalam memimpin tim, mengelola konflik, dan menciptakan lingkungan kerja yang produktif.",
    materi: "Materi pelatihan mencakup teori dan praktik kepemimpinan, manajemen tim, komunikasi, dan motivasi.",
    pengertianDetail: "Pelatihan Kepemimpinan Dasar adalah program komprehensif yang dirancang untuk membantu peserta memahami dan mengaplikasikan prinsip-prinsip kepemimpinan fundamental. Program ini mencakup pemahaman mendalam tentang gaya kepemimpinan, psikologi tim, komunikasi efektif, dan strategi motivasi yang dapat diterapkan dalam berbagai situasi kerja.",
    output: "Peserta mampu memahami prinsip kepemimpinan, mengelola tim efektif, dan menerapkan gaya kepemimpinan sesuai situasi."
  },
];

// --- Filtered Data ---
const filteredData = computed(() => {
  return pelatihan.filter((item) => {
    return (
      searchQuery.value === "" ||
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );
  });
});

// --- Pagination ---
const currentPage = ref(1);
const itemsPerPage = 10;

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredData.value.slice(start, start + itemsPerPage);
});

// --- Open Detail ---
function openDetail(item) {
  selected.value = item;
  showModal.value = true;
}
</script>

<style>
:root {
  font-family: "Poppins", sans-serif;
}
</style>
