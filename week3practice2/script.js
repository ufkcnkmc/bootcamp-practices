$(document).ready(function () {
  let page = 0;
  const limit = 5;
  let loading = false;
  let allPostsLoaded = false;

  $("#loading").hide();
  $("#error").hide();

  loadPosts();

  $(window).scroll(function () {
    if (
      $(window).scrollTop() + $(window).height() >
      $(document).height() - 200
    ) {
      if (!loading && !allPostsLoaded) {
        loadPosts();
      }
    }
  });

  function loadPosts() {
    if (loading) return;

    loading = true;
    $("#loading").show();

    $.ajax({
      url: `https://jsonplaceholder.typicode.com/posts?_start=${
        page * limit
      }&_limit=${limit}`,
      method: "GET",
      success: function (data) {
        if (data.length === 0) {
          allPostsLoaded = true;
          $("#loading").hide();
          loading = false;
          return;
        }

        $.each(data, function (index, post) {
          $("#postList").append(`
                        <li>
                            <h2>${post.title}</h2>
                            <p>${post.body}</p>
                        </li>
                    `);
        });

        page++;
        loading = false;
        $("#loading").hide();
      },
      error: function (xhr, status, error) {
        console.error("API Hatası:", error);
        $("#error").show();
        $("#loading").hide();
        loading = false;
      },
    });
  }
});
