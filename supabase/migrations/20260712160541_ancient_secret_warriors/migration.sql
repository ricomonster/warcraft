CREATE TYPE "alignment" AS ENUM('buff', 'nerf', 'none');--> statement-breakpoint
CREATE TYPE "days" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');--> statement-breakpoint
CREATE TYPE "difficulty" AS ENUM('easy', 'medium', 'hard');--> statement-breakpoint
CREATE TYPE "due_date_type" AS ENUM('today', 'tomorrow', '3days', 'next_week', 'custom');--> statement-breakpoint
CREATE TYPE "type" AS ENUM('daily', 'habit', 'todo');--> statement-breakpoint
CREATE TABLE "quests" (
	"id" serial PRIMARY KEY,
	"quest" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"color" varchar(20) NOT NULL,
	"icon" varchar(20) NOT NULL,
	"difficulty" "difficulty" NOT NULL,
	"daily_reminder" boolean DEFAULT false,
	"remind_time_at" time(0),
	"remind_days_at" varchar[],
	"notes" text,
	"type" "type" NOT NULL,
	"days" "days"[],
	"target" integer DEFAULT 0,
	"alignment" "alignment",
	"due_date_type" "due_date_type",
	"due_date" date,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
