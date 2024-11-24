-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "did" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "description" TEXT,
    "displayname" TEXT,
    "avatar" TEXT,
    "postscount" INTEGER,
    "persona" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_did_key" ON "profile"("did");
