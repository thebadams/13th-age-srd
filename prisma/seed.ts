import {readFile} from 'fs/promises'
import path from 'path'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function getClasses() {
	const file = path.join(process.cwd(), 'data/classes.json')
	const res = await readFile(file, 'utf8');
	const data = JSON.parse(res);
	console.log(data);
	return data;
}

async function seedClasses() {
	const classData = await getClasses()
	try {
		const classes = await prisma.class.createMany({data: classData})
		console.log(classes)
	} catch (error) {
		console.error(error)
	} finally {
		await prisma.$disconnect()
	}
}

async function seed() {
	void await seedClasses()
}

seed()