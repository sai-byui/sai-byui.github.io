const TUTORIALS_FOLDER_NAME = "tutorials";

// gets the server host address
const hostname = window.location.host;
const folderAddress = "../../tutorials";

// basic format to get a list of files in github: "https://api.github.com/repos/{owner}/{repo}/git/trees/master"
// returns a list of files inside the subfolder "tutorials"
// TODO: Replace the url with one that links straight to "sai-byui.github.io/pages/tutorials/tutorials"
let githubAPI = "https://api.github.com/repos/sai-byui/sai-byui.github.io/git/trees/master"

fetch(githubAPI)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        
        for (item of data.tree) {
            if (item.path == TUTORIALS_FOLDER_NAME) {
                // console.log(item.path);
                let nav = document.getElementById("links");

                fetch(item.url)
                .then(response => response.json())
                .then(tutorialsFolder => {
                    // console.log(tutorialsFolder.tree);
                    addPages(nav, tutorialsFolder.tree, folderAddress);
                });
                
                break;
            }
        }
    })


/**************************************************
 * parentEl:    The element links will be attached to
 * jsonTree:    The github tree that holds file/folder data
 * folderURL:   The url of the folder containing tutorials
 *                      ex. sai-byui.github.io/pages/tutorials/tutorials
 * parentTitleEl: The li containing parentEl. If this is set to an element,
 *                      it will be changed to represent the first item in the 
 *                      directory. a.k.a. item 0.
 **************************************************/
function addPages(parentEl, jsonTree, folderURL, parentTitleEl=false) {
    // console.log("Tree : ", jsonTree)
    // get list of files/branches in tree
    let index = 0;
    for (branch of jsonTree) {
        // console.log(branch);

        let fileSource = folderURL + "/"  + branch.path

        // if it's a file (blob), add a link to it
        if (branch.type == "blob") {
            let link = document.createElement("a")
            link.href = '#' // makes the mouse look like it'll click

            // console.log(fileSource);
            link.addEventListener("click", function() {
                displayMD(fileSource);
            });

            // remove .md file extension without removing it from actual names
            // for example, replace "About README.md files.md" with "About README.md files"
            link.innerText = branch.path.substr(0,branch.path.lastIndexOf('.md'));

            let li
            if (parentTitleEl && index == 0) {
                // treat the parent as the first list item
                parentTitleEl.append(link)
                parentTitleEl.append(parentEl)
            }
            else {
                li = document.createElement("li");
                li.appendChild(link);
                parentEl.appendChild(li);
            }
            ++index;
        }
        // else, add a new element for and recursively go deeper
        // a folder will display contained items as indented. foldet names with the same prefix as an md
        // file will be displayed below that item
        else if (branch.type == "tree") {
            let nextLayerParentTitle = document.createElement("li")
            let nextLayerParent = document.createElement("ul");

            // Attach new parent to a list item
            parentEl.appendChild(nextLayerParentTitle);
            // nextLayerParentTitle.appendChild(nextLayerParent);
            
            // next layer folder url
            let nextFolderURL = fileSource + "/";
            fetch(branch.url)
            .then(response => response.json())
            .then(data => {
                addPages(nextLayerParent, data.tree, nextFolderURL, nextLayerParentTitle);
            })
        }
    } // end of for (branch of jsonTree)
}

function displayMD(linkToFile) {
    const zeroMD = document.getElementById("markdown-display");
    zeroMD.src=linkToFile;
}