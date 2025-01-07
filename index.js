#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs-extra";
import { parseDocument } from "yaml";

const program = new Command();

program
  .name("mystruct")
  .description("A CLI tool to create file structures from YAML")
  .version("1.0.0");

program
  .command("init")
  .description("Initialize a new file structure")
  .action(() => {
    // Check if the struct.yml file exists
    const yamlPath = "./struct.yml";
    if (!fs.existsSync(yamlPath)) {
      console.error(
        "Error: struct.yml file not found in the current directory."
      );
      process.exit(1); // Exit the process with an error code
    }

    // Prompt user for the output folder
    inquirer
      .prompt([
        {
          type: "input",
          name: "outputFolder",
          message: "What is the name of the output folder?",
          default: "output",
        },
      ])
      .then((answers) => {
        const { outputFolder } = answers;

        // Ensure output folder exists
        fs.ensureDirSync(outputFolder);
        console.log(`Created output folder: ${outputFolder}`);

        // Read and parse the YAML file
        const file = fs.readFileSync(yamlPath, "utf8");
        const doc = parseDocument(file);
        const structure = doc.toJSON();

        // Recursively create the file structure based on YAML
        createStructure(structure, outputFolder);

        console.log("File structure created successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

program.parse(process.argv);

// Recursive function to create files and folders based on the YAML structure
function createStructure(structure, basePath) {
  if (Array.isArray(structure)) {
    structure.forEach((item) => {
      if (typeof item === "string") {
        const filePath = `${basePath}/${item}`;
        fs.ensureFileSync(filePath);
      } else if (typeof item === "object") {
        for (const folderName in item) {
          const folderPath = `${basePath}/${folderName}`;
          fs.ensureDirSync(folderPath);
          createStructure(item[folderName], folderPath);
        }
      }
    });
  } else if (typeof structure === "object") {
    for (const key in structure) {
      const rootPath = `${basePath}/${key}`;
      fs.ensureDirSync(rootPath);
      createStructure(structure[key], rootPath);
    }
  }
}
