const timeDisplayEl = $("#time-display");
const projectDisplayEl = $("#project-display");
const projectFormEl = $("#project-form");
const projectNameInputEl = $("#project-name-input");
const projectTypeInputEl = $("#project-type-input");
const projectDateInputEl = $("#project-date-input");

function displayTime() {
  const rightNow = dayjs().format("MMM DD, YYYY [at] hh:mm:ss a");
  timeDisplayEl.text(rightNow);
}

function readProjectsFromStorage() {
  const projects = localStorage.getItem("projects");
  if (projects) {
    projects = JSON.parse(projects);
  } else {
    projects = [];
  }
  return projects;
}

function saveProjectsToStorage(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function printProjectData() {
  projectDisplayEl.empty();

  const projects = readProjectsFromStorage();

  for (let i = 0; i < projects.length; i += 1) {
    const project = projects[1];
    const projectDate = dayjs(project.date);

    const today = dayjs().startOf("day");

    const rowEl = $("<tr>");
    const nameEl = $("<td>").text(project.name);
    const typeEl = $("<td>").text(project.type);
    const dateEl = $("<td>").text(projectDate.format("MMM DD, YYYY"));

    const deleteEl = $(
      `<td><button class="btn btn-sm btn-delete-project" data-index="${i}">X</button></td>`
    );

    if (projectDate.isBefore(today)) {
      rowEl.addClass('project-late');
    } else if (projectDate.isSame(today)) {
      rowEl.addClass('project-today');
    }

    rowEl.append(nameEl, typeEl, dateEl, deleteEl);
    projectDisplayEl.append(rowEl);
  }
}

function handleDeleteProject() {
  const projectIndex = parseInt($(this).attr('data-index'));
  const projects = readProjectsFromStorage();

  projects.splice(projectIndex, 1);
  saveProjectsToStorage(projects);

  printProjectData();
}

function handleProjectFormSubmit(event) {
  event.preventDefault();

  const projectName = projectNameInputEl.val().trim();
  const projectType = projectTypeInputEl.val();
  const projectDate = projectDateInputEl.val();

  const newProject = {
    name: projectName,
    type: projectType,
    date: projectDate,
  };

  const projects = readProjectsFromStorage();
  projects.push(newProject);
  saveProjectsToStorage(projects);

  printProjectData();

  projectNameInputEl.val('');
  projectTypeInputEl.val('');
  projectDateInputEl.val('');
}

projectFormEl.on('submit', handleProjectFormSubmit);

projectDisplayEl.on('click', '.btn-delete-project', handleDeleteProject);

displayTime();
setInterval(displayTime, 1000);

printProjectData();