CREATE TYPE "timeframe" AS ENUM('today', 'tomorrow', '3days', 'next_week', 'custom');--> statement-breakpoint
ALTER TABLE "quests" ADD COLUMN "timeframe" "timeframe";--> statement-breakpoint
ALTER TABLE "quests" DROP COLUMN "due_date_type";--> statement-breakpoint
DROP TYPE "due_date_type";