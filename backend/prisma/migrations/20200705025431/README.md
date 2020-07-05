# Migration `20200705025431`

This migration has been generated by Yuri Yakovlev at 7/5/2020, 2:54:31 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Comment" (
"battleId" text  NOT NULL ,"id" text  NOT NULL ,"text" text  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

ALTER TABLE "public"."Battle" DROP CONSTRAINT IF EXiSTS "Battle_userId_fkey",
ALTER COLUMN "userId" SET NOT NULL;

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("battleId")REFERENCES "public"."Battle"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Battle" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200704204346..20200705025431
--- datamodel.dml
+++ datamodel.dml
@@ -3,23 +3,35 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Battle {
-  id          String @id @default(cuid())
+  id          String    @id @default(cuid())
   description String
+  comments    Comment[]
-  User   User?   @relation(fields: [userId], references: [id])
-  userId String?
+  User   User   @relation(fields: [userId], references: [id])
+  userId String
 }
 model User {
-  id       String   @id @default(cuid())
-  userName String   @unique
-  email    String   @unique
+  id       String    @id @default(cuid())
+  userName String    @unique
+  email    String    @unique
   password String
   fullName String
   battles  Battle[]
+  comments Comment[]
 }
+
+model Comment {
+  id   String @id @default(uuid())
+  text String
+
+  User     User   @relation(fields: [userId], references: [id])
+  userId   String
+  Battle   Battle @relation(fields: [battleId], references: [id])
+  battleId String
+}
```

