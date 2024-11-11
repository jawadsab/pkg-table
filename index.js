#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import Table from 'cli-table';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import welcome from 'cli-welcome';
import pkg from "./package.json" assert {type: "json"};

const log = console.log;

// Get the current directory
const currentDir = process.cwd();
const packageJsonPath = path.join(currentDir, 'package.json');

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

welcome({
	title: pkg.name,
	description: pkg.description,
	version: pkg.version,
	bgColor: "#FFF689",
	bold: true,
	clear: true
});

try {
	// Check if package.json exists
	if (!fs.existsSync(packageJsonPath)) {
		log(`${chalk.bold.red('Oops! Package.json not found')}`);
		process.exit(1);
	}

	// Read and parse package.json
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

	const spinner = createSpinner("Scanning your project...").start();

	await sleep(1000);

	spinner.success(`${chalk.bold("Scan completed successfully\n")}`);


	const dependencies = packageJson.dependencies || {};
	const dependenciesCount = Object.keys(dependencies).length;
	const dependenciesTable = new Table({
		head: [`${chalk.hex("#E03616").bold('S.No.')}`, `${chalk.hex('#F7C548').bold("Package")}`, `${chalk.hex("#ACC196").bold("Version")}`],
		colWidths: [10, 30, 20]
	});

	// Print dependencies in a table format
	log(`${chalk.hex('#e76f51').bold.inverse(` ${dependenciesCount} Dependencies `)}\n`);
	Object.keys(dependencies).forEach((dep, count) => {
		dependenciesTable.push([count + 1, dep, dependencies[dep]]);
	});
	console.log(dependenciesTable.toString());


	const devDependencies = packageJson.devDependencies || {};
	const devDependenciesCount = Object.keys(devDependencies).length;
	const devDependenciesTable = new Table({
		head: [`${chalk.hex("#E03616").bold('S.No.')}`, `${chalk.hex('#F7C548').bold("Package")}`, `${chalk.hex("#ACC196").bold("Version")}`],
		colWidths: [10, 30, 20]
	});
	log(`\n\n ${chalk.hex('#ffb703').bold.inverse(` ${devDependenciesCount} Dev Dependencies `)}\n`);
	Object.keys(devDependencies).forEach((dep, count) => {
		devDependenciesTable.push([count + 1, dep, devDependencies[dep]]);
	});
	console.log(devDependenciesTable.toString());


} catch (error) {
	console.error('Error reading package.json:', error);
	process.exit(1);
}


// var table = new Table({
// 	head: [`${chalk.blue('Haha')}`, 'TH 2 label']
// 	, colWidths: [100, 100],
// });

// // table is an Array, so you can `push`, `unshift`, `splice` and friends
// table.push(
// 	['1', 'First value', 'Second value']
// 	, ['2', 'First value', 'Second value']
// );

