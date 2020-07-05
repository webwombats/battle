# Migration `20200705133813`

This migration has been generated by Yuri Yakovlev at 7/5/2020, 1:38:13 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Battle" DROP COLUMN "sideA",
DROP COLUMN "sideB";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200705133728..20200705133813
--- datamodel.dml
+++ datamodel.dml
@@ -3,16 +3,16 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Battle {
   id          String     @id @default(cuid())
   description String
-  sideA       String
-  sideB       String
+  // sideA       String
+  // sideB       String
   arguments   Argument[]
   User   User   @relation(fields: [userId], references: [id])
   userId String
```

