$(document).ready(() => {
  $('#searchUser').on('input', function(e) {
    const username = e.target.value.trim();

    if(username != "") {
      // Make request to Github
      $.ajax({
        url: `https://api.github.com/users/${username}`,
        data: {
          client_id: '836e9d184ef28152012b',
          client_secret: 'ff43e5ad7d744e3742c6fce58aa62a96587bbf8e'
        }
      })
    .done(function(user) {
      // Make another request for repos
      $.ajax({
        url: `https://api.github.com/users/${username}/repos`,
        data: {
          client_id: '836e9d184ef28152012b',
          client_secret: 'ff43e5ad7d744e3742c6fce58aa62a96587bbf8e',
          sort: 'created: asc', // the url allows us to send the parameter of sort
        }
      })
        .done(function(repos) {
          console.log(repos);
          $.each(repos, function(i, repo) {
            const output = `
              <div class="card spec">
                <div class="row">
                  <div class="col-md-7">
                    <strong>${repo.name}</strong>: ${repo.description}
                  </div>

                  <div class="col-md-2">
                    <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                </div>

                <div class="col-md-3">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-info">Repo Page</a>
                </div>
                </div>
              </div>
            `;
            $('#repos').append(output);
          });
        });
      // console.log(user);
      const output = `
        <div class="col-md-9 offset-md-1 card text-white bg-primary mt-3 mb-3">
          <div class="card-header">${user.name}</div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-3 col-sm-4 grid">
                <img src="${user.avatar_url}" alt="${user.name}">
                <a href="${user.html_url}" target="_blank" class="btn btn-block btn-info">Profile</a>
              </div>
              <div class="col-md-9 col-sm-8 text-center">
                <span class="badge badge-pill badge-light">Public Repos: ${user.public_repos}</span>
                <span class="badge badge-pill badge-secondary">Public Gists: ${user.public_gists}</span>
                <span class="badge badge-pill badge-success">Followers: ${user.followers}</span>
                <span class="badge badge-pill badge-danger">Following: ${user.following}</span>

                <ul class="list-group mt-3">
                  <li class="list-group-item">Bio: ${user.bio}</li>
                  <li class="list-group-item">Website: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                  <li class="list-group-item">Location: ${user.location}</li>
                  <li class="list-group-item">Email: ${user.email}</li>                  
                  <li class="list-group-item">Member since: ${user.created_at}</li>
                </ul>
              </div>
            </div>
        </div>

        <h3 class="page-header text-center">Latest Repos</h3>
        <div id="repos" class="mb-3"></div>
      `;

      $('#profile').html(output);
    });
    }
  });
});