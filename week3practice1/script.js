const studentData = [
  { name: "Ufuk Can Kumcu", class: "11-B", favoriteCourse: "Matematik" },
  { name: "Sıla Şahin", class: "9-C", favoriteCourse: "Türkçe" },
  { name: "Umut Can Kumcu", class: "12-C", favoriteCourse: "Fizik" },
  { name: "İrfan Eren Çiftçi ", class: "9-A", favoriteCourse: "Biyoloji" },
  { name: "Feyzullah Şengül", class: "12-A", favoriteCourse: "Edebiyat" },
];

$(document).ready(function () {
  listStudents();

  $("#studentForm").on("submit", function (e) {
    e.preventDefault();

    const newStudent = {
      name: $("#name").val(),
      class: $("#class").val(),
      favoriteCourse: $("#favoriteCourse").val(),
    };

    studentData.push(newStudent);
    listStudents();

    this.reset();
  });

  $("#studentList").on("click", ".sil-btn", function () {
    const index = $(this).data("index");
    studentData.splice(index, 1);
    listStudents();
  });

  $("#studentList").on("click", "tr", function () {
    $(this).toggleClass("secili");
  });
});

function listStudents() {
  const tbody = $("#studentList");
  tbody.empty();

  studentData.forEach((student, index) => {
    const row = $("<tr>").append(
      $("<td>").text(student.name),
      $("<td>").text(student.class),
      $("<td>").text(student.favoriteCourse),
      $("<td>").append(
        $("<button>").addClass("sil-btn").text("Sil").data("index", index)
      )
    );
    tbody.append(row);
  });
}
