export const sqlScript = `
    CREATE TABLE public.actor_entity
(
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying NOT NULL,
  photo character varying NOT NULL,
  nationality character varying NOT NULL,
  "birthDate" timestamp without time zone NOT NULL,
  biography character varying NOT NULL,
  CONSTRAINT "PK_6f735d208eac41f67be7cb349bc" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.actor_entity
  OWNER TO postgres;

  CREATE TABLE public.director_entity
(
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying NOT NULL,
  photo character varying NOT NULL,
  nationality character varying NOT NULL,
  "birthDate" timestamp without time zone NOT NULL,
  biography character varying NOT NULL,
  CONSTRAINT "PK_626cf3e00366a5dafb43b6cbb63" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.director_entity
  OWNER TO postgres;

  CREATE TABLE public.genre_entity
  (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    type character varying NOT NULL,
    CONSTRAINT "PK_cae0cec334ef1e35fe187160f0d" PRIMARY KEY (id)
  )
  WITH (
    OIDS=FALSE
  );
  ALTER TABLE public.genre_entity
    OWNER TO postgres;

    

  
    CREATE TABLE public.platform_entity
(
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying NOT NULL,
  url character varying NOT NULL,
  CONSTRAINT "PK_ad26ad68861322f0ec769b5b7e6" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.platform_entity
  OWNER TO postgres;

  
    

  CREATE TABLE public.youtube_trailer_entity
(
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying NOT NULL,
  url character varying NOT NULL,
  duration integer NOT NULL,
  channel character varying NOT NULL,
  CONSTRAINT "PK_8e7e5a529e0a33109a13f280112" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.youtube_trailer_entity
  OWNER TO postgres;



  CREATE TABLE public.movie_entity
  (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    title character varying NOT NULL,
    poster character varying NOT NULL,
    duration integer NOT NULL,
    country character varying NOT NULL,
    "releaseDate" timestamp without time zone NOT NULL,
    popularity integer NOT NULL,
    "directorId" uuid,
    "genreId" uuid,
    "youtubeTrailerId" uuid,
    CONSTRAINT "PK_9a7f80ec733baad243af6ba1f80" PRIMARY KEY (id),
    CONSTRAINT "FK_011744a49b8acc97dc8b2d90ede" FOREIGN KEY ("youtubeTrailerId")
        REFERENCES public.youtube_trailer_entity (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "FK_300c2231d5ce2e8dda5173873e8" FOREIGN KEY ("genreId")
        REFERENCES public.genre_entity (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "FK_31f16d3bf3f40e6c9d3966d300d" FOREIGN KEY ("directorId")
        REFERENCES public.director_entity (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "REL_011744a49b8acc97dc8b2d90ed" UNIQUE ("youtubeTrailerId")
  )
  WITH (
    OIDS=FALSE
  );
  ALTER TABLE public.movie_entity
    OWNER TO postgres;


    CREATE TABLE public.movie_entity_actors_actor_entity
  (
    "movieEntityId" uuid NOT NULL,
    "actorEntityId" uuid NOT NULL,
    CONSTRAINT "PK_7e3757233c8221b499df2b3ec6b" PRIMARY KEY ("movieEntityId", "actorEntityId"),
    CONSTRAINT "FK_6f22362497d7d47d7962b7cba9f" FOREIGN KEY ("movieEntityId")
        REFERENCES public.movie_entity (id) MATCH SIMPLE
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "FK_9f995b4c5539aa2c437c62b18a1" FOREIGN KEY ("actorEntityId")
        REFERENCES public.actor_entity (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
  )
  WITH (
    OIDS=FALSE
  );
  ALTER TABLE public.movie_entity_actors_actor_entity
    OWNER TO postgres;
  
  -- Index: public."IDX_6f22362497d7d47d7962b7cba9"
  
  -- DROP INDEX public."IDX_6f22362497d7d47d7962b7cba9";
  
  CREATE INDEX "IDX_6f22362497d7d47d7962b7cba9"
    ON public.movie_entity_actors_actor_entity
    USING btree
    ("movieEntityId");
  
  -- Index: public."IDX_9f995b4c5539aa2c437c62b18a"
  
  -- DROP INDEX public."IDX_9f995b4c5539aa2c437c62b18a";
  
  CREATE INDEX "IDX_9f995b4c5539aa2c437c62b18a"
    ON public.movie_entity_actors_actor_entity
    USING btree
    ("actorEntityId");

  
    CREATE TABLE public.platform_entity_movies_movie_entity
  (
    "platformEntityId" uuid NOT NULL,
    "movieEntityId" uuid NOT NULL,
    CONSTRAINT "PK_0e3e78a782b032726f206550037" PRIMARY KEY ("platformEntityId", "movieEntityId"),
    CONSTRAINT "FK_1ca2b623a482fa33d637032be18" FOREIGN KEY ("platformEntityId")
        REFERENCES public.platform_entity (id) MATCH SIMPLE
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "FK_a57cae2228544c798351921c970" FOREIGN KEY ("movieEntityId")
        REFERENCES public.movie_entity (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
  )
  WITH (
    OIDS=FALSE
  );
  ALTER TABLE public.platform_entity_movies_movie_entity
    OWNER TO postgres;
  
  -- Index: public."IDX_1ca2b623a482fa33d637032be1"
  
  -- DROP INDEX public."IDX_1ca2b623a482fa33d637032be1";
  
  CREATE INDEX "IDX_1ca2b623a482fa33d637032be1"
    ON public.platform_entity_movies_movie_entity
    USING btree
    ("platformEntityId");
  
  -- Index: public."IDX_a57cae2228544c798351921c97"
  
  -- DROP INDEX public."IDX_a57cae2228544c798351921c97";
  
  CREATE INDEX "IDX_a57cae2228544c798351921c97"
    ON public.platform_entity_movies_movie_entity
    USING btree
    ("movieEntityId");


    CREATE TABLE public.review_entity
(
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  text character varying NOT NULL,
  score integer NOT NULL,
  creator character varying NOT NULL,
  "movieId" uuid,
  CONSTRAINT "PK_5a7a10bab252068bd06d10d49e6" PRIMARY KEY (id),
  CONSTRAINT "FK_2ed623f9d0b913233b46e798aa4" FOREIGN KEY ("movieId")
      REFERENCES public.movie_entity (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.review_entity
  OWNER TO postgres;

insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('fa540a31-2c26-42dc-afb5-2cd30af6a88e', 'Barnett Campagne', 'http://dummyimage.com/237x100.png/cc0000/ffffff', 'Ireland', '1995-12-20', 'Reactive dynamic hardware');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('4499e858-3ea4-47c3-8515-32f85d32bbc2', 'Godiva Durran', 'http://dummyimage.com/228x100.png/dddddd/000000', 'China', '2000-07-22', 'Digitized human-resource process improvement');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('dba451d9-8103-4997-b475-44baacdedc1c', 'Sib Whittingham', 'http://dummyimage.com/239x100.png/dddddd/000000', 'China', '1942-03-31', 'Profit-focused 5th generation middleware');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('beaeb2b0-b10f-487a-bf68-794161e00acf', 'Papagena Bales', 'http://dummyimage.com/133x100.png/ff4444/ffffff', 'Venezuela', '1992-04-30', 'Total transitional superstructure');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('edf80966-0535-4b0d-8e29-23c9d661203a', 'Gale Ege', 'http://dummyimage.com/244x100.png/ff4444/ffffff', 'Philippines', '1985-05-14', 'Inverse grid-enabled focus group');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('20618814-9005-4426-9bc0-81035ecd709a', 'Page Ricardon', 'http://dummyimage.com/166x100.png/cc0000/ffffff', 'Poland', '1977-11-09', 'Configurable modular groupware');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('4e067528-6499-4911-b640-6f584c6ff8b1', 'Davie Paskerful', 'http://dummyimage.com/136x100.png/5fa2dd/ffffff', 'Indonesia', '1920-11-08', 'Vision-oriented dedicated archive');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('f1d8ad7c-7945-4e7e-a0e2-46086495b0eb', 'Misti Setchell', 'http://dummyimage.com/201x100.png/cc0000/ffffff', 'Russia', '2005-07-05', 'Up-sized asymmetric open architecture');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('f527e864-c2f8-4d94-8c33-70178d9ebd4a', 'Ruthann Van Arsdale', 'http://dummyimage.com/153x100.png/dddddd/000000', 'Argentina', '1977-11-01', 'Digitized content-based time-frame');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('8a3f199b-8f52-4099-ae3c-50cd05eb7778', 'Niles Pail', 'http://dummyimage.com/196x100.png/cc0000/ffffff', 'Peru', '1936-06-30', 'Upgradable asymmetric Graphic Interface');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('b148f869-bab1-4958-9938-1e07325d92b8', 'Dorene Phlipon', 'http://dummyimage.com/145x100.png/ff4444/ffffff', 'Russia', '1961-11-14', 'Focused analyzing software');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('489b4ad9-03ed-4b79-8756-f1f383497135', 'Ruth Snowling', 'http://dummyimage.com/120x100.png/5fa2dd/ffffff', 'Sweden', '1977-03-04', 'Compatible value-added standardization');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('44050c5c-ef09-43d6-8b79-97fc9f082c74', 'Alistair Margarson', 'http://dummyimage.com/202x100.png/ff4444/ffffff', 'Colombia', '1971-07-07', 'Pre-emptive analyzing matrices');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('290e5548-cdde-42f8-9697-21cabf928185', 'Fayth Skeene', 'http://dummyimage.com/116x100.png/5fa2dd/ffffff', 'Nigeria', '2018-06-23', 'Automated regional intranet');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('cd8630ff-09f4-4191-85c1-e33b20766ab3', 'Brewster Hayne', 'http://dummyimage.com/210x100.png/dddddd/000000', 'Germany', '1996-06-19', 'Persistent background focus group');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('299611e5-8756-4f16-b2eb-57c1ab8cf714', 'Josie Bucham', 'http://dummyimage.com/242x100.png/dddddd/000000', 'Colombia', '1937-10-13', 'Optional national migration');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('33a1a859-8f16-4dbd-b157-660008d394cb', 'Olivier Bonicelli', 'http://dummyimage.com/148x100.png/cc0000/ffffff', 'Dominican Republic', '2003-08-04', 'Synergized coherent conglomeration');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('44bb4a6c-22fd-4ce3-b443-86f322327eb5', 'Greta Semble', 'http://dummyimage.com/230x100.png/cc0000/ffffff', 'Nicaragua', '1986-05-28', 'Integrated exuding task-force');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('758e4433-98ca-45ec-8ce7-6d395ade40f1', 'Christoph Boldry', 'http://dummyimage.com/243x100.png/ff4444/ffffff', 'Indonesia', '1923-09-23', 'Enhanced uniform groupware');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('8d72b6d0-bbd5-429d-b74a-f55fbc7a2e77', 'Datha Vials', 'http://dummyimage.com/219x100.png/cc0000/ffffff', 'Brazil', '1995-10-31', 'Profit-focused 24 hour info-mediaries');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('110f56bf-cee2-4d92-a7f4-2a6a8e701b7e', 'Richmound Foss', 'http://dummyimage.com/164x100.png/5fa2dd/ffffff', 'Japan', '2011-10-08', 'Universal well-modulated alliance');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('9d7769c4-074a-4312-8e6a-d8ae89baba65', 'Wilfrid Fermoy', 'http://dummyimage.com/119x100.png/ff4444/ffffff', 'Pakistan', '1967-05-05', 'Optional analyzing productivity');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('606cae9e-eae9-4a9a-b035-278abe89aa1a', 'Pietra Loadman', 'http://dummyimage.com/119x100.png/ff4444/ffffff', 'United States', '1989-07-04', 'Streamlined national implementation');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('71a7c91d-f999-4bd9-88e4-2ebf671c234b', 'Hedwiga Goodbarr', 'http://dummyimage.com/167x100.png/5fa2dd/ffffff', 'Philippines', '1934-10-04', 'Virtual fault-tolerant groupware');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('904be10c-e989-4b27-ac8f-7f665390249c', 'Myranda Pierrepoint', 'http://dummyimage.com/147x100.png/dddddd/000000', 'Tanzania', '1943-07-21', 'Business-focused next generation model');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('54232141-3da5-4e2e-be95-a6bc8813eb97', 'Esmaria Gobell', 'http://dummyimage.com/112x100.png/cc0000/ffffff', 'China', '2007-08-27', 'Progressive impactful interface');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('1316333f-514e-42b4-9422-d47f23ca54dc', 'Murdoch Flowitt', 'http://dummyimage.com/220x100.png/dddddd/000000', 'Sweden', '1943-12-13', 'Robust optimal instruction set');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('91f1b19c-eac0-485b-9fd3-d7d87a5fe123', 'Allsun Plumstead', 'http://dummyimage.com/243x100.png/ff4444/ffffff', 'Indonesia', '1997-04-26', 'Balanced bifurcated firmware');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('912c42f3-2ec0-4d83-8eef-d847b5c91538', 'Tami Yellowlees', 'http://dummyimage.com/249x100.png/dddddd/000000', 'China', '1964-11-16', 'Sharable fresh-thinking pricing structure');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('f55183ab-fa3f-451f-9eaf-48300ab2df52', 'Augustin Convery', 'http://dummyimage.com/112x100.png/ff4444/ffffff', 'France', '1944-03-17', 'Enterprise-wide reciprocal capacity');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('90c97cbb-5504-4a85-adc4-28a62fd77c9c', 'Winni Willicott', 'http://dummyimage.com/250x100.png/5fa2dd/ffffff', 'China', '1960-07-03', 'Visionary motivating interface');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('25c36793-d831-4b28-a557-499f7e30c30c', 'Briant Calendar', 'http://dummyimage.com/149x100.png/5fa2dd/ffffff', 'Chile', '1974-11-05', 'Adaptive optimal capacity');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('ae8299a0-5225-4a9a-8a4c-c26e16e663ae', 'Elnora Van Arsdall', 'http://dummyimage.com/152x100.png/5fa2dd/ffffff', 'China', '2010-02-16', 'Business-focused radical leverage');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('f9b3fcd0-f58c-4b95-85d3-4f2fd7a48612', 'Ignacio Levick', 'http://dummyimage.com/158x100.png/5fa2dd/ffffff', 'Indonesia', '1952-10-13', 'Face to face scalable approach');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('a03627a8-9fb2-4a51-ba9f-f3fad4c4349d', 'Waldo Murrey', 'http://dummyimage.com/133x100.png/5fa2dd/ffffff', 'Indonesia', '1971-04-30', 'Assimilated explicit emulation');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('a6fd75e7-2e76-4d6c-9ebe-509fd1d3d05d', 'Linnea Petrolli', 'http://dummyimage.com/184x100.png/ff4444/ffffff', 'Russia', '1977-07-20', 'Customizable optimizing conglomeration');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('64a4df41-eca1-4dcd-9a92-02f6f7d09d2b', 'Dulci Risom', 'http://dummyimage.com/140x100.png/ff4444/ffffff', 'Indonesia', '2000-05-01', 'Cross-platform foreground functionalities');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('093761eb-0e48-429b-b6e3-af33f4653ad0', 'Cass Keedwell', 'http://dummyimage.com/204x100.png/dddddd/000000', 'Germany', '1979-09-05', 'Fundamental discrete conglomeration');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('ac0528ed-7774-444b-8c4b-645d20fae4f5', 'Britney Haughan', 'http://dummyimage.com/186x100.png/5fa2dd/ffffff', 'Czech Republic', '1993-05-13', 'Team-oriented actuating process improvement');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('09d4d4cf-68df-4996-8eb2-db0dabe6afc7', 'Cristiano Keach', 'http://dummyimage.com/235x100.png/cc0000/ffffff', 'Poland', '1998-08-26', 'Advanced real-time solution');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('778b95f2-61d8-4569-95a0-87538653f858', 'Ermin Dafydd', 'http://dummyimage.com/130x100.png/dddddd/000000', 'Portugal', '1946-11-09', 'Multi-tiered actuating challenge');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('04b9f2e4-3149-4e9c-937d-a531d6f892d1', 'Lorilyn Janoch', 'http://dummyimage.com/109x100.png/5fa2dd/ffffff', 'Russia', '2013-09-16', 'Stand-alone 24 hour implementation');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('c99b5df1-df98-4154-8c7f-00e804508140', 'Isadore Mansfield', 'http://dummyimage.com/178x100.png/cc0000/ffffff', 'Vietnam', '1996-01-25', 'Integrated user-facing Graphical User Interface');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('a313fd3a-754d-4bd4-ba1e-5e1abd093087', 'Luis Hirth', 'http://dummyimage.com/100x100.png/5fa2dd/ffffff', 'Slovenia', '1941-02-17', 'Enhanced high-level open architecture');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('04f03373-898d-4bb4-a879-44ed8319dc37', 'Aluino Kynvin', 'http://dummyimage.com/183x100.png/5fa2dd/ffffff', 'Canada', '1933-03-28', 'Down-sized transitional project');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('cc53570c-856c-4cda-a2c6-4e4ad81e78dd', 'Ransom Rudderham', 'http://dummyimage.com/134x100.png/cc0000/ffffff', 'China', '2000-07-29', 'Programmable user-facing extranet');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('8eadddb0-1232-4cce-8b4f-141cd4902d9f', 'Reeva Marages', 'http://dummyimage.com/156x100.png/5fa2dd/ffffff', 'Thailand', '2002-03-11', 'Realigned dynamic contingency');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('8b637595-7611-4e2d-b52e-5b3011716c91', 'Malynda Tranmer', 'http://dummyimage.com/184x100.png/ff4444/ffffff', 'Netherlands', '1962-03-27', 'Upgradable disintermediate toolset');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('cf420724-9a08-4b3c-9b4a-cffadc085110', 'Jeanne Mursell', 'http://dummyimage.com/194x100.png/dddddd/000000', 'Lithuania', '1953-05-29', 'Business-focused executive approach');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('b3857bf0-cb00-4c16-acd4-aad7eccf5d35', 'Alasdair Huddlestone', 'http://dummyimage.com/100x100.png/cc0000/ffffff', 'Russia', '2011-06-09', 'Function-based multi-tasking support');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('69c9721c-af3a-4f0c-9063-5164b35a8577', 'Seana Garretson', 'http://dummyimage.com/173x100.png/ff4444/ffffff', 'China', '1948-10-09', 'Persevering asymmetric project');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('8911b5bc-1e59-42cc-9d1c-c5da3f2d0d24', 'Hall McArd', 'http://dummyimage.com/133x100.png/dddddd/000000', 'Philippines', '1981-11-27', 'Business-focused even-keeled access');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('21e027c9-9ac0-4575-8ae5-3f19c0cab657', 'Eleanora Priver', 'http://dummyimage.com/215x100.png/5fa2dd/ffffff', 'Sweden', '1954-03-03', 'Fundamental coherent matrices');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('e7ec8a75-95da-4da0-9b59-c945770581fd', 'Auberon Bartosiak', 'http://dummyimage.com/106x100.png/ff4444/ffffff', 'Russia', '1965-02-15', 'Polarised encompassing projection');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('ddb2e0be-ee30-492a-9647-f3c82c804cdb', 'Ruby Caldeiro', 'http://dummyimage.com/203x100.png/cc0000/ffffff', 'Indonesia', '1979-06-06', 'Cloned demand-driven architecture');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('28579f72-262f-43fd-9222-7757a2991b71', 'Rivi Isenor', 'http://dummyimage.com/114x100.png/cc0000/ffffff', 'Russia', '1992-10-09', 'Enterprise-wide disintermediate internet solution');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('b4124bb0-5806-42cb-932c-d432daa15ab4', 'Jeremiah Peggrem', 'http://dummyimage.com/250x100.png/cc0000/ffffff', 'Brazil', '2015-09-22', 'Managed multimedia secured line');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('d7eaaefc-8b16-4cc7-bd8d-78acf5229cde', 'Goldie Duffus', 'http://dummyimage.com/102x100.png/ff4444/ffffff', 'Greece', '1983-03-19', 'Re-engineered next generation superstructure');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('45d4f6de-1a2d-4f84-8de9-3c86b20cd6d0', 'Hillel Kift', 'http://dummyimage.com/213x100.png/5fa2dd/ffffff', 'Japan', '1976-12-02', 'Monitored neutral concept');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('91147b5a-d2d6-4f92-b865-a680b6af8a10', 'Mathe Hinkens', 'http://dummyimage.com/141x100.png/cc0000/ffffff', 'China', '1943-11-11', 'Organic hybrid algorithm');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('b25dc2a7-696b-4feb-9400-e116a21c5ae3', 'Husein Laurenceau', 'http://dummyimage.com/214x100.png/ff4444/ffffff', 'Sweden', '1958-06-25', 'Organic multimedia groupware');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('325902c1-6bb5-48f9-8b0a-c686dcfb425f', 'Jeralee Danigel', 'http://dummyimage.com/217x100.png/5fa2dd/ffffff', 'Indonesia', '1941-09-25', 'Future-proofed next generation core');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('15176245-71d9-4557-98dc-979974445bc2', 'Lindsey Louis', 'http://dummyimage.com/238x100.png/dddddd/000000', 'Indonesia', '1977-11-08', 'Centralized impactful software');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('885d149d-ac7f-426d-8913-91df5cdd3d0b', 'Gigi Brummell', 'http://dummyimage.com/197x100.png/cc0000/ffffff', 'China', '1987-01-22', 'Persevering zero administration installation');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('9eabe172-8c15-4fb6-b577-fde2444f2c8c', 'Bianka Brimacombe', 'http://dummyimage.com/163x100.png/cc0000/ffffff', 'Colombia', '1943-09-03', 'Focused modular groupware');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('393fe1a8-e8e8-42a3-a8cd-5bfea1f567c6', 'Margarita Jellybrand', 'http://dummyimage.com/168x100.png/ff4444/ffffff', 'France', '2015-02-26', 'Object-based eco-centric middleware');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('3e396566-abb0-4bd2-beba-02890009a1ea', 'Thadeus Ryburn', 'http://dummyimage.com/164x100.png/ff4444/ffffff', 'Sweden', '1988-08-23', 'Focused fault-tolerant algorithm');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('7e3d68f2-7773-4489-b5bc-0047e134de25', 'Clemente Rosone', 'http://dummyimage.com/100x100.png/5fa2dd/ffffff', 'Bulgaria', '1996-05-28', 'Business-focused motivating software');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('a6d6fff4-3dc8-4846-9462-09702b1ff120', 'Ludvig Vonasek', 'http://dummyimage.com/151x100.png/5fa2dd/ffffff', 'Philippines', '1936-01-22', 'Advanced logistical frame');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('b5d6aa5e-91e8-410b-9563-c0916fd167cd', 'Ray Bromell', 'http://dummyimage.com/169x100.png/5fa2dd/ffffff', 'China', '1984-06-23', 'Programmable well-modulated system engine');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('d7501458-b260-4731-a8a6-36ac1f846d2c', 'Lelia Packington', 'http://dummyimage.com/135x100.png/ff4444/ffffff', 'Russia', '1941-02-07', 'Ameliorated holistic paradigm');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('29c36b89-7ede-45bd-b47c-e75171a6edf7', 'Angelia Hartlebury', 'http://dummyimage.com/131x100.png/cc0000/ffffff', 'New Caledonia', '1943-06-11', 'Horizontal needs-based ability');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('961c027b-ccf5-4892-91b5-709f53eace25', 'Bryant Mulhill', 'http://dummyimage.com/181x100.png/cc0000/ffffff', 'France', '1966-09-02', 'Object-based multi-tasking success');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('da77fe11-69af-4fec-a0e0-ab7a920b1166', 'Florry Raffeorty', 'http://dummyimage.com/117x100.png/dddddd/000000', 'Sweden', '2020-02-02', 'Seamless transitional product');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('f1311c57-edf1-4996-bd94-c159c00630f0', 'Zenia Sincock', 'http://dummyimage.com/228x100.png/dddddd/000000', 'Bolivia', '1995-01-25', 'Face to face local model');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('e0b4aa7f-566f-4cfa-a001-9b8ce4b42b37', 'Lorene Knok', 'http://dummyimage.com/117x100.png/dddddd/000000', 'Philippines', '1920-07-07', 'Reduced hybrid alliance');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('be6b7e71-bfac-4d84-ac3c-b31d1ede8599', 'Alecia Locke', 'http://dummyimage.com/131x100.png/ff4444/ffffff', 'Pakistan', '2006-02-16', 'Operative intermediate structure');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('9553b937-d7bb-417a-bfb5-5b19d86e1542', 'Uriel Knath', 'http://dummyimage.com/228x100.png/cc0000/ffffff', 'China', '1975-04-26', 'Optimized composite flexibility');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('bb130121-9698-4da2-993b-9675f1219b23', 'Shel Petow', 'http://dummyimage.com/137x100.png/ff4444/ffffff', 'China', '1937-06-05', 'Compatible mission-critical pricing structure');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('67031872-18c8-4bb3-b0f8-ea86a808a47d', 'Ursulina Pighills', 'http://dummyimage.com/140x100.png/ff4444/ffffff', 'China', '1988-04-29', 'Public-key scalable intranet');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('a9793810-8caf-4f54-a7db-3b577643cb3e', 'Garfield Priel', 'http://dummyimage.com/113x100.png/ff4444/ffffff', 'Indonesia', '1930-04-11', 'Optimized motivating internet solution');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('7d8b0286-42fb-41df-8040-f58137a93aeb', 'Ira Seakin', 'http://dummyimage.com/186x100.png/dddddd/000000', 'South Africa', '1932-06-02', 'Sharable clear-thinking workforce');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('3c73f530-c8cf-4605-bb88-a1c272eb48d0', 'Neville Fenck', 'http://dummyimage.com/214x100.png/ff4444/ffffff', 'Venezuela', '1989-04-13', 'Multi-tiered optimal budgetary management');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('b95eae3a-1709-419f-97e1-f29f2b3279ba', 'Vinnie Tirone', 'http://dummyimage.com/142x100.png/ff4444/ffffff', 'United States', '1942-11-16', 'Down-sized tertiary process improvement');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('7f56afbd-ddc5-42ae-870f-8936271c2073', 'Huntlee Kirrens', 'http://dummyimage.com/226x100.png/dddddd/000000', 'Indonesia', '1924-04-23', 'Synergized reciprocal framework');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('6f565152-9ece-4865-8b10-ed3084b5e0cd', 'Marcy Tinline', 'http://dummyimage.com/237x100.png/ff4444/ffffff', 'China', '2014-07-03', 'Switchable upward-trending approach');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('1e99a6db-1b48-4ddf-89c4-a4b9833665da', 'Celisse Bonnyson', 'http://dummyimage.com/207x100.png/cc0000/ffffff', 'China', '1929-04-04', 'Organic full-range groupware');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('2a0891de-608c-4f16-a740-f3122ed31e45', 'Lauralee Picken', 'http://dummyimage.com/155x100.png/dddddd/000000', 'Uzbekistan', '2004-03-08', 'Fundamental actuating open architecture');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('6565c9ed-3a96-4b1a-bae7-fd9871cce289', 'Nappy Coats', 'http://dummyimage.com/161x100.png/dddddd/000000', 'Indonesia', '1976-03-21', 'Devolved national parallelism');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('f080bda2-9fc8-49cc-bff4-2e8e8fbc40ef', 'Rozella Deathridge', 'http://dummyimage.com/205x100.png/5fa2dd/ffffff', 'Canada', '2010-01-11', 'Optional client-server focus group');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('f885c7c7-2d71-44dd-aa1c-8ec3e8debed3', 'Nerissa Romanelli', 'http://dummyimage.com/216x100.png/ff4444/ffffff', 'China', '2017-05-07', 'Compatible multimedia contingency');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('a7f9b826-ebe3-4530-8c58-61d510930fdd', 'Callie Quail', 'http://dummyimage.com/146x100.png/dddddd/000000', 'Zimbabwe', '1953-12-23', 'Function-based directional productivity');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('d55890bf-f707-40fc-aa7b-98d5274a1567', 'Waverly Aplin', 'http://dummyimage.com/190x100.png/5fa2dd/ffffff', 'Mexico', '1958-02-20', 'Advanced client-driven standardization');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('4fcdeb0e-f70c-423f-850b-913caa3b45c6', 'Eleen Hutchings', 'http://dummyimage.com/212x100.png/dddddd/000000', 'China', '1953-03-28', 'Reactive didactic support');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('4b587c54-bdfc-421c-a0d3-c64ba1ecb238', 'Hall Samwaye', 'http://dummyimage.com/192x100.png/dddddd/000000', 'Brazil', '1931-08-31', 'Reverse-engineered encompassing toolset');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('3a4ed199-0a9a-4488-84ad-be46ba36fbba', 'Devy Hartas', 'http://dummyimage.com/217x100.png/ff4444/ffffff', 'Peru', '2022-04-25', 'Optional reciprocal capacity');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('9c61debe-69ad-4af2-8e28-ba9ad2566c6d', 'Peg Po', 'http://dummyimage.com/207x100.png/ff4444/ffffff', 'Philippines', '1932-07-05', 'Team-oriented national intranet');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('0be365d3-427b-4246-822a-294d7a55cf69', 'Felike Rangeley', 'http://dummyimage.com/144x100.png/dddddd/000000', 'China', '2001-03-08', 'Public-key systematic data-warehouse');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('bbf3a11b-b9a8-4890-93bc-4ad92bbe5ea9', 'Glyn Rudge', 'http://dummyimage.com/211x100.png/cc0000/ffffff', 'Brazil', '1981-10-02', 'Stand-alone motivating capacity');
insert into actor_entity (id, name, photo, nationality, "birthDate", biography) values ('40be5aa9-ca5b-4e8d-9332-390f9c156449', 'Errick Jantet', 'http://dummyimage.com/169x100.png/ff4444/ffffff', 'Russia', '1922-01-08', 'Decentralized tertiary monitoring');


--Director

insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('5e942ab8-e045-4048-896c-8f79e5ce2bc7', 'Ursula Trippitt', 'http://dummyimage.com/161x100.png/dddddd/000000', 'Egypt', '1939-12-05', 'Stand-alone user-facing process improvement');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('7910bf0b-f4d4-4137-bec7-d516fe1c7f0d', 'Lulu Kerford', 'http://dummyimage.com/209x100.png/cc0000/ffffff', 'Philippines', '1949-06-14', 'User-friendly human-resource Graphical User Interface');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('a17ced5e-ee68-4228-bf86-bec7a865ae54', 'Reine Phillps', 'http://dummyimage.com/138x100.png/ff4444/ffffff', 'Czech Republic', '1932-08-26', 'Total cohesive methodology');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('9e89588c-6c95-4c40-bce7-618c33b502a7', 'Blondell Mobley', 'http://dummyimage.com/107x100.png/ff4444/ffffff', 'Indonesia', '1980-09-10', 'Face to face uniform product');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('71e0af28-a497-4a3a-be89-1e752604ed9c', 'Edith Prickett', 'http://dummyimage.com/202x100.png/cc0000/ffffff', 'China', '1960-08-31', 'Quality-focused reciprocal info-mediaries');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('c8d4cf57-1f43-4ff4-ad89-8e2b83acd4b7', 'Lemmy Beltzner', 'http://dummyimage.com/230x100.png/5fa2dd/ffffff', 'Bulgaria', '1982-01-22', 'Multi-layered needs-based archive');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('e8a05c02-83f8-4c5e-a83c-edd992d0d407', 'Reuben Aspray', 'http://dummyimage.com/100x100.png/5fa2dd/ffffff', 'Russia', '2008-09-22', 'Devolved disintermediate system engine');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('acfa10dd-b444-4ac3-a404-0e0cdbc73133', 'Amber Dupey', 'http://dummyimage.com/212x100.png/ff4444/ffffff', 'Indonesia', '1934-02-03', 'Universal zero tolerance service-desk');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('dc07b1f6-61ec-4625-b955-53a596c029f3', 'Werner Crosgrove', 'http://dummyimage.com/224x100.png/5fa2dd/ffffff', 'Russia', '1970-11-06', 'Re-engineered attitude-oriented architecture');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('1e63035b-fac7-43ca-8496-fe0c8974b242', 'Kayley Pattesall', 'http://dummyimage.com/159x100.png/ff4444/ffffff', 'Mexico', '1983-02-19', 'Universal mobile productivity');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('60048430-50ed-4330-be65-e49d4959f76b', 'Evaleen Ivashechkin', 'http://dummyimage.com/220x100.png/dddddd/000000', 'Latvia', '1926-09-29', 'Balanced object-oriented access');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('42854243-5833-4867-8c0f-7ccf80cde8e8', 'Bret Clelland', 'http://dummyimage.com/228x100.png/5fa2dd/ffffff', 'China', '1936-11-05', 'Synchronised logistical matrix');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('37f07a23-73d0-49f7-b411-4630b746876b', 'Leann Broadwood', 'http://dummyimage.com/236x100.png/5fa2dd/ffffff', 'Finland', '1962-12-14', 'Phased demand-driven software');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('07ec84aa-b17d-445b-a22c-dcdc964406d9', 'Flint Gorce', 'http://dummyimage.com/107x100.png/cc0000/ffffff', 'Czech Republic', '1979-06-02', 'Devolved executive secured line');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('9e9513c3-4dbe-4e93-9847-0949b05bc0dd', 'Linet Heineken', 'http://dummyimage.com/244x100.png/5fa2dd/ffffff', 'Russia', '1931-10-16', 'Persistent tertiary installation');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('97cdcffd-4330-4e41-9cb0-b0b227301973', 'Vanessa Wadeson', 'http://dummyimage.com/233x100.png/5fa2dd/ffffff', 'Argentina', '2012-07-10', 'Extended optimizing task-force');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('b2e413ab-5268-4dc9-b553-cbbdad87af1a', 'Rakel Whaley', 'http://dummyimage.com/148x100.png/ff4444/ffffff', 'Poland', '1931-01-22', 'Versatile bandwidth-monitored function');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('fda77232-03dd-438c-b0c3-7402f2baec77', 'Johna Falla', 'http://dummyimage.com/190x100.png/5fa2dd/ffffff', 'Turkmenistan', '2002-03-24', 'Synergistic transitional database');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('a154feb5-7f89-4a98-b9c3-d144488044e5', 'Micheil Cootes', 'http://dummyimage.com/190x100.png/5fa2dd/ffffff', 'Indonesia', '2020-03-07', 'Object-based motivating framework');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('3f84a5f6-2e79-4b07-88ea-d1c717b6b52e', 'Sheila Bramsen', 'http://dummyimage.com/115x100.png/ff4444/ffffff', 'Tajikistan', '1955-09-19', 'Adaptive analyzing focus group');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('1134766a-3f09-461d-8a41-e0d25e6f1200', 'Kala Coudray', 'http://dummyimage.com/248x100.png/5fa2dd/ffffff', 'China', '1943-10-13', 'Total neutral methodology');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('0ee72dc3-c670-4107-87f3-462b1d2bae43', 'Martainn Alvarado', 'http://dummyimage.com/134x100.png/ff4444/ffffff', 'Argentina', '1947-06-17', 'Decentralized full-range info-mediaries');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('86bf1fca-ac99-45c3-a12e-2692a113ff60', 'Bertram McRitchie', 'http://dummyimage.com/140x100.png/ff4444/ffffff', 'Sweden', '1969-03-27', 'Programmable radical hub');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('a81a0bee-f1ed-4394-b324-329c57fe3c62', 'Anders Mundell', 'http://dummyimage.com/155x100.png/5fa2dd/ffffff', 'China', '1924-05-02', 'Cross-platform asymmetric help-desk');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('aaac0989-5168-4361-a00e-09a3616c3e90', 'Constantino Ratt', 'http://dummyimage.com/208x100.png/ff4444/ffffff', 'Brazil', '1952-03-29', 'Managed bandwidth-monitored installation');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('3001cc51-eaa7-45bf-ae43-ac4ca408453d', 'Trixi Rispen', 'http://dummyimage.com/117x100.png/dddddd/000000', 'Estonia', '1992-12-30', 'Enhanced global complexity');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('6d888fbc-800a-4491-a627-c455b8b76ff9', 'Nollie Britnell', 'http://dummyimage.com/145x100.png/5fa2dd/ffffff', 'China', '1996-10-17', 'Cross-platform empowering focus group');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('db0e034c-4a40-4d13-a09a-246ce06b493b', 'Raynard Trass', 'http://dummyimage.com/151x100.png/ff4444/ffffff', 'France', '1970-11-25', 'Multi-layered logistical success');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('ce53c270-c153-4fee-b0d6-1632e6adbaa7', 'Andeee Andren', 'http://dummyimage.com/171x100.png/cc0000/ffffff', 'Thailand', '1983-04-11', 'Up-sized zero defect matrix');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('179d2d6e-a9e9-409f-83e4-8bf5fe1b469e', 'Lovell Dockwray', 'http://dummyimage.com/224x100.png/ff4444/ffffff', 'Kenya', '1965-08-09', 'Assimilated transitional workforce');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('6432613e-1788-4296-998f-e81a9ab74af2', 'Magda Loweth', 'http://dummyimage.com/146x100.png/ff4444/ffffff', 'Indonesia', '1997-10-28', 'Horizontal exuding time-frame');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('ac35fbb7-17e1-40be-8651-7740c17937ed', 'Freddie Filov', 'http://dummyimage.com/164x100.png/cc0000/ffffff', 'Greece', '1968-06-21', 'Seamless attitude-oriented instruction set');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('bcb56830-2560-4ddb-9a0c-234261195d35', 'Mata Dandy', 'http://dummyimage.com/232x100.png/dddddd/000000', 'Mexico', '1986-11-17', 'Managed non-volatile internet solution');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('f5911ae0-e511-418a-96c2-dc7b2ce9a456', 'Brinn MacKonochie', 'http://dummyimage.com/145x100.png/cc0000/ffffff', 'France', '1945-01-08', 'Right-sized human-resource secured line');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('081efe1f-9e50-4256-baf6-6dc5250491f5', 'Margarette Liven', 'http://dummyimage.com/225x100.png/ff4444/ffffff', 'France', '1925-05-17', 'Synergistic fault-tolerant orchestration');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('578dd869-461e-4fe5-abb9-0c9161aa3701', 'Jolene Purdom', 'http://dummyimage.com/180x100.png/cc0000/ffffff', 'Uzbekistan', '1934-07-06', 'Function-based executive product');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('1b43b078-7290-45cd-85f2-236756af4037', 'Genevra MacAlinden', 'http://dummyimage.com/194x100.png/dddddd/000000', 'Gambia', '1941-04-12', 'User-friendly responsive contingency');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('73b7b3d8-9a4b-4d9f-814a-ec6ce96c291f', 'Alana Strettell', 'http://dummyimage.com/238x100.png/5fa2dd/ffffff', 'Japan', '1969-08-06', 'Front-line hybrid ability');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('6aa2b176-db0f-42a3-8ddb-50453b787094', 'Miranda Reuble', 'http://dummyimage.com/168x100.png/dddddd/000000', 'Russia', '2003-10-16', 'Customizable intermediate methodology');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('e31b06f8-4241-4bae-99cc-180b4cda5470', 'Dalis Chiles', 'http://dummyimage.com/114x100.png/ff4444/ffffff', 'Russia', '2021-08-30', 'Implemented context-sensitive concept');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('7754c53d-6897-409e-a55b-e5fd818dd126', 'Maisie Letertre', 'http://dummyimage.com/132x100.png/cc0000/ffffff', 'Indonesia', '2004-06-03', 'Grass-roots transitional conglomeration');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('d3aad6ad-3dec-4afa-8d81-03572617fa9b', 'Wittie Freeman', 'http://dummyimage.com/122x100.png/cc0000/ffffff', 'Greece', '1973-04-27', 'Managed fault-tolerant forecast');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('3356bfe7-e2d0-4587-8b7d-847cfb12183e', 'Max Cristea', 'http://dummyimage.com/166x100.png/5fa2dd/ffffff', 'Philippines', '2014-09-04', 'Polarised client-driven structure');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('438e21f0-6228-4782-b6c1-52115a3d83c9', 'Trefor Anselmi', 'http://dummyimage.com/118x100.png/dddddd/000000', 'Madagascar', '1965-02-18', 'Enterprise-wide foreground migration');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('b000705e-80cd-4a40-ac89-6cf709bccf07', 'Sheila-kathryn McTeague', 'http://dummyimage.com/137x100.png/5fa2dd/ffffff', 'China', '2021-09-29', 'Optimized multi-tasking synergy');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('453045dd-5ce7-4ec0-a562-d1d8289d6347', 'Hal Fasham', 'http://dummyimage.com/214x100.png/ff4444/ffffff', 'Vietnam', '1978-04-27', 'Face to face background Graphical User Interface');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('cefdabf9-ab44-489c-bd87-fa0b54217395', 'Durand Kubicek', 'http://dummyimage.com/172x100.png/5fa2dd/ffffff', 'Russia', '2016-09-03', 'Synergized local interface');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('8b08036b-5deb-466a-8de4-fdb7b7c71d54', 'Atalanta Dysert', 'http://dummyimage.com/112x100.png/dddddd/000000', 'China', '1942-05-02', 'Implemented incremental service-desk');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('072aeeb3-730b-4bf3-8efc-796f5e004635', 'Bryant Breem', 'http://dummyimage.com/114x100.png/dddddd/000000', 'Estonia', '1966-04-10', 'Customer-focused 6th generation model');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('fb269cd7-3253-4789-ad0c-305db1222267', 'Bryn Blincowe', 'http://dummyimage.com/226x100.png/dddddd/000000', 'Brazil', '2019-11-11', 'Digitized interactive emulation');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('16330611-3ebb-46cc-951b-ee209a575513', 'Sonia Morrant', 'http://dummyimage.com/233x100.png/cc0000/ffffff', 'China', '1980-10-16', 'Synergized dedicated utilisation');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('8dd52365-302f-484d-8715-90277f6c7479', 'Pia Feighney', 'http://dummyimage.com/176x100.png/cc0000/ffffff', 'Indonesia', '1950-10-15', 'Cloned leading edge approach');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('b56eaee8-76fd-4d41-810b-3dd8ff692ba5', 'Flo Astlett', 'http://dummyimage.com/174x100.png/5fa2dd/ffffff', 'Tajikistan', '1933-07-06', 'Stand-alone reciprocal utilisation');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('c32bb570-1edc-4f8f-8bc0-c399d5b60818', 'Terese Abarough', 'http://dummyimage.com/167x100.png/dddddd/000000', 'China', '1973-05-11', 'Synergistic well-modulated benchmark');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('bea6c8fd-cf3f-4b56-8b3b-606c21be53f1', 'Gare Fitzharris', 'http://dummyimage.com/207x100.png/5fa2dd/ffffff', 'Czech Republic', '1959-08-30', 'Versatile secondary monitoring');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('1149a126-a216-4da0-8480-34b66e32724f', 'Loralyn Gumby', 'http://dummyimage.com/160x100.png/cc0000/ffffff', 'China', '1936-04-16', 'Customer-focused encompassing matrices');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('458e57b2-8220-4461-b5a2-c82477cd2eaa', 'Viva Cansdall', 'http://dummyimage.com/180x100.png/5fa2dd/ffffff', 'Vietnam', '2015-07-25', 'Decentralized fault-tolerant superstructure');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('12feb060-1236-4770-a9ff-fbf29c81388a', 'Arney Weavill', 'http://dummyimage.com/103x100.png/cc0000/ffffff', 'Russia', '2002-11-28', 'Cross-group 24 hour success');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('42a7f5a0-775b-464a-a594-c828fde6b044', 'Anabal Olivetta', 'http://dummyimage.com/146x100.png/5fa2dd/ffffff', 'China', '1987-06-22', 'Enterprise-wide national synergy');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('6859e418-f2e7-4a48-a261-01a4ba807f38', 'Anne-corinne Raraty', 'http://dummyimage.com/245x100.png/5fa2dd/ffffff', 'China', '1995-08-27', 'Polarised 3rd generation initiative');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('31dbbe25-8a14-4bc1-9d9c-964e88f60757', 'Giorgia Astill', 'http://dummyimage.com/143x100.png/5fa2dd/ffffff', 'China', '2020-09-10', 'Pre-emptive uniform throughput');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('b326dd2d-8aab-4cec-99ff-9cec0b3eaab5', 'Ermanno Proger', 'http://dummyimage.com/163x100.png/5fa2dd/ffffff', 'Japan', '1941-03-19', 'Re-engineered 3rd generation middleware');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('801ea769-1424-4c32-87d7-4ff86a30b121', 'Cam Herkess', 'http://dummyimage.com/207x100.png/ff4444/ffffff', 'China', '1941-10-20', 'Integrated transitional circuit');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('4c3301ac-1d21-49f4-a845-5730ac8d9cc6', 'Maximilian Schwant', 'http://dummyimage.com/210x100.png/dddddd/000000', 'France', '1997-06-24', 'Down-sized multi-state protocol');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('e6d26f3b-9d29-4eca-8099-eb9e60689502', 'Erick Gourdon', 'http://dummyimage.com/168x100.png/ff4444/ffffff', 'Cameroon', '1974-01-03', 'Operative background website');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('4eb33ad1-bd0b-4b43-bb96-0fb6ca473495', 'Sheena Skule', 'http://dummyimage.com/135x100.png/5fa2dd/ffffff', 'Greece', '1967-11-02', 'Persevering even-keeled process improvement');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('96583286-6d79-4501-9c9c-7f254f866213', 'Elsinore Shalders', 'http://dummyimage.com/175x100.png/cc0000/ffffff', 'France', '1943-06-17', 'Optimized client-driven challenge');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('d06f4054-aee8-462d-bf60-19906efa0211', 'Gallard L''oiseau', 'http://dummyimage.com/156x100.png/5fa2dd/ffffff', 'Sweden', '1977-07-12', 'Persistent optimizing conglomeration');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('8c1ba6da-afda-483d-8545-dc83dd1ad510', 'Wood Haistwell', 'http://dummyimage.com/159x100.png/5fa2dd/ffffff', 'Ukraine', '1931-07-19', 'Compatible 4th generation Graphical User Interface');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('a5796ad9-b1d0-4272-ac98-bae0f096af49', 'Elliott Bloxsome', 'http://dummyimage.com/119x100.png/ff4444/ffffff', 'Cuba', '1985-04-12', 'Synchronised context-sensitive neural-net');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('7890787f-dfc5-479e-b827-d11a6bfd5672', 'Teddie Moine', 'http://dummyimage.com/230x100.png/ff4444/ffffff', 'Iran', '1982-06-07', 'Implemented web-enabled superstructure');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('04699c9e-64df-4f6b-9895-8123390ee195', 'Giulio Hadcock', 'http://dummyimage.com/120x100.png/ff4444/ffffff', 'Japan', '1972-06-07', 'Cross-group discrete process improvement');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('0b43921a-eb1b-44ba-bd7b-db416b74fe62', 'Alberik Strowthers', 'http://dummyimage.com/100x100.png/5fa2dd/ffffff', 'Indonesia', '1999-10-31', 'Fundamental even-keeled Graphical User Interface');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('5a69a143-843a-43e3-a9be-60cbe51456e4', 'Myrta Wilcot', 'http://dummyimage.com/126x100.png/dddddd/000000', 'Finland', '1982-02-14', 'Integrated 5th generation workforce');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('6464abca-1d36-47ec-b01c-f6aeee23f5e3', 'Dynah O''Cassidy', 'http://dummyimage.com/111x100.png/dddddd/000000', 'Norway', '1956-04-03', 'Multi-tiered web-enabled secured line');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('8f39b37f-86c2-4507-8f8d-45aea984ff0c', 'Terrill Shickle', 'http://dummyimage.com/173x100.png/ff4444/ffffff', 'Portugal', '1961-04-01', 'Realigned asymmetric complexity');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('a662cd23-7068-4758-8696-33a5337fe36f', 'Libby Nabarro', 'http://dummyimage.com/155x100.png/cc0000/ffffff', 'Pakistan', '2012-11-23', 'Secured tangible matrix');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('b236a224-ae71-4438-89bf-ce6726827871', 'Suzie Coetzee', 'http://dummyimage.com/245x100.png/5fa2dd/ffffff', 'Nigeria', '1992-06-09', 'Reduced interactive application');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('6e539fee-805f-48e4-abbc-8ae598dffaa5', 'Pauly Yurikov', 'http://dummyimage.com/241x100.png/ff4444/ffffff', 'Czech Republic', '1982-04-19', 'Cloned 5th generation customer loyalty');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('358526ec-86cb-443d-ae8e-57f89abaffb6', 'Steffen Itzkin', 'http://dummyimage.com/130x100.png/cc0000/ffffff', 'Peru', '1974-09-18', 'Organized upward-trending structure');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('d0b40c8d-3d48-47b7-9ec7-6f49afbd3dec', 'Kinna Struys', 'http://dummyimage.com/210x100.png/5fa2dd/ffffff', 'Israel', '1979-03-12', 'Horizontal regional workforce');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('9ec58d7f-19bb-40e6-865e-c2bc006e1feb', 'Sheeree Jerdan', 'http://dummyimage.com/162x100.png/ff4444/ffffff', 'Vietnam', '2016-12-09', 'Focused mobile framework');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('7c7680dd-eea7-49ad-8633-6c72297198c2', 'Mal Harpham', 'http://dummyimage.com/153x100.png/5fa2dd/ffffff', 'Hungary', '1940-12-30', 'Distributed leading edge emulation');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('dfae67da-d380-4063-8dd3-99f7307f0c49', 'Sile Filippyev', 'http://dummyimage.com/161x100.png/ff4444/ffffff', 'China', '2002-09-27', 'Decentralized regional local area network');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('fb5572b2-b406-44d7-927c-6ce98b277475', 'Heida Archanbault', 'http://dummyimage.com/135x100.png/cc0000/ffffff', 'China', '2021-09-07', 'Grass-roots bi-directional pricing structure');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('262aca66-890a-45eb-95b2-3276492717fc', 'Ivan Duckfield', 'http://dummyimage.com/248x100.png/5fa2dd/ffffff', 'Philippines', '1982-09-16', 'Reduced neutral help-desk');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('881f205b-bd35-43c2-9451-67930303eabd', 'Son McAllan', 'http://dummyimage.com/134x100.png/ff4444/ffffff', 'Ukraine', '1961-10-30', 'Enterprise-wide impactful flexibility');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('8cb7d854-54cf-4554-8ca3-11b1b5b056ec', 'Lin McAsgill', 'http://dummyimage.com/154x100.png/ff4444/ffffff', 'Brazil', '1984-08-03', 'Object-based high-level algorithm');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('8984055e-5a09-404e-aa69-3d9d19aa8490', 'Rheta Fronek', 'http://dummyimage.com/143x100.png/ff4444/ffffff', 'Sweden', '1978-05-01', 'Universal exuding installation');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('8d92b637-d825-47ac-b4de-2724e593eae1', 'Jane Witherdon', 'http://dummyimage.com/142x100.png/cc0000/ffffff', 'Colombia', '1972-04-25', 'Cloned dynamic matrices');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('f59e1016-623e-49c1-9556-4c11d8a9b4e6', 'Krishna Belch', 'http://dummyimage.com/134x100.png/ff4444/ffffff', 'Brazil', '1976-04-28', 'Persistent static capability');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('c1bee8c6-d6ce-42f7-886a-b4a59d64963c', 'Connie Hawkridge', 'http://dummyimage.com/128x100.png/5fa2dd/ffffff', 'Canada', '1945-03-05', 'Seamless upward-trending instruction set');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('452d203f-8147-41ed-a297-ef96469b7978', 'Kial Plover', 'http://dummyimage.com/110x100.png/dddddd/000000', 'Colombia', '1935-10-10', 'Enhanced fault-tolerant projection');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('3bb7fdbb-1d66-4223-829f-e70f1c0b5fbf', 'Cristobal Herrieven', 'http://dummyimage.com/243x100.png/dddddd/000000', 'Bosnia and Herzegovina', '1986-01-05', 'Face to face methodical standardization');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('4abbfd31-4cb0-4ca8-b1ee-6aa030a7e990', 'Si Please', 'http://dummyimage.com/137x100.png/cc0000/ffffff', 'Spain', '1920-05-15', 'Intuitive demand-driven array');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('43f4196f-b99c-4db5-ad94-dcf97707a9a6', 'Bibbie Sherreard', 'http://dummyimage.com/107x100.png/cc0000/ffffff', 'Indonesia', '2017-09-23', 'Seamless tertiary intranet');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('ed5c2887-94ef-4936-961f-3845ca32ad23', 'Allis Seiller', 'http://dummyimage.com/138x100.png/5fa2dd/ffffff', 'Portugal', '2021-07-03', 'Extended multimedia instruction set');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('b3fe9e38-eb93-491f-bf16-ecf8aee94590', 'Phyllys Gosswell', 'http://dummyimage.com/180x100.png/ff4444/ffffff', 'Colombia', '1950-02-14', 'Polarised reciprocal superstructure');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('8c0f104e-df27-4528-ab05-6a03e3bbb81b', 'Worthington O''Moylan', 'http://dummyimage.com/145x100.png/dddddd/000000', 'Peru', '1971-10-14', 'Front-line empowering Graphic Interface');
insert into director_entity (id, name, photo, nationality, "birthDate", biography) values ('f69f2723-a4ea-495e-9bc1-4be019a6be33', 'Corey Trowl', 'http://dummyimage.com/104x100.png/5fa2dd/ffffff', 'Portugal', '2003-08-14', 'Cross-platform human-resource installation');


-- Genre

insert into genre_entity (id, type) values ('2fb83849-05f9-4e4e-954b-5e736c2d7445', 'Drama');
insert into genre_entity (id, type) values ('72b68ea2-cc16-4624-a5cf-91d18545a100', 'Crime');
insert into genre_entity (id, type) values ('51623e47-15db-41df-a178-c6467371635b', 'Film-Noir');
insert into genre_entity (id, type) values ('2b087e1d-0eab-4a6f-b486-09221d32326d', 'Fantasy');
insert into genre_entity (id, type) values ('c8ce4b0b-ab05-4e00-8ae8-81336b88999c', 'Comedy');
insert into genre_entity (id, type) values ('fa6ab762-b1e6-4a6a-855a-1906fe006817', 'Action');
insert into genre_entity (id, type) values ('90d5fd9a-44da-4f09-94cb-92177f2b1ac6', 'Mystery');
insert into genre_entity (id, type) values ('720c08ea-cd55-47cf-9286-9acfba6da12d', 'Musical');
insert into genre_entity (id, type) values ('f76ae1d2-7a93-4506-96e3-e3173a3ee7fb', 'Thriller');
insert into genre_entity (id, type) values ('95f75c58-d439-4897-99a1-6397f64bdd79', 'Adventure');

-- Platform

insert into platform_entity (id, name, url) values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613', 'Zoombox', 'https://icq.com/sed/augue/aliquam/erat/volutpat/in.png');
insert into platform_entity (id, name, url) values ('b83d2206-d9da-4612-b8fe-e26dd605b999', 'Jetwire', 'http://cpanel.net/felis.jsp');
insert into platform_entity (id, name, url) values ('a88e394f-fa04-4502-98bb-b6b511bf75ef', 'Twitterbridge', 'http://independent.co.uk/mauris/non/ligula/pellentesque.html');
insert into platform_entity (id, name, url) values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3', 'Brightbean', 'https://wsj.com/diam/vitae/quam/suspendisse/potenti/nullam/porttitor.xml');
insert into platform_entity (id, name, url) values ('f59384e2-bec8-4113-8eb2-c41a67289c04', 'Skimia', 'https://typepad.com/sapien/varius/ut/blandit/non/interdum/in.png');

-- Youtube Trailer


insert into youtube_trailer_entity (id, name, url, duration, channel) values ('fe4d0266-25e7-4b13-b89d-bdabfdef56c1', 'Official Trailer (HD)', 'http://yellowbook.com/at/vulputate/vitae/nisl/aenean.html', 2, 'interface');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('7384f4a2-4f26-4954-900d-5a76e31d201c', 'Official Trailer (HD)', 'http://nhs.uk/sagittis/nam/congue/risus/semper.html', 3, 'eco-centric');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('fbff48a6-3917-40a8-a4a9-7b9c95a86690', 'Official Trailer (HD)', 'https://devhub.com/nullam/varius/nulla.json', 4, '24/7');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('3bd22f0a-fd46-4ccb-9655-e03c96fc0011', 'Official Trailer (HD)', 'http://ftc.gov/quam/sapien.aspx', 1, 'complexity');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('3934418d-5854-4add-bafd-8f6299e1aaca', 'Official Trailer (HD)', 'https://xinhuanet.com/ante/vestibulum.js', 1, 'software');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('fc611627-9a9f-4c78-a8e1-be7572f5a130', 'Official Trailer (HD)', 'https://spiegel.de/in/felis/eu.xml', 5, 'Re-engineered');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('d9cb0390-5b39-48fe-bf5b-4bd9d6d7fb32', 'Official Trailer (HD)', 'http://issuu.com/viverra/dapibus/nulla/suscipit/ligula/in/lacus.json', 5, 'contextually-based');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('c3bed396-2dbd-4237-8ed3-e0d744570dbc', 'Official Trailer (HD)', 'https://imgur.com/rhoncus/aliquam/lacus/morbi/quis/tortor/id.aspx', 4, 'holistic');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('f4372c83-60e5-4ac8-b5ec-cd84ece51274', 'Official Trailer (HD)', 'http://slate.com/dapibus/duis/at/velit.xml', 1, 'bifurcated');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('2e147042-0e7b-4819-b297-dc9428f97215', 'Official Trailer (HD)', 'http://liveinternet.ru/dolor/quis/odio/consequat/varius/integer.xml', 1, 'complexity');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('763b221e-025a-47ef-a06a-467b24988d71', 'Official Trailer (HD)', 'http://va.gov/etiam/pretium/iaculis/justo/in/hac.jpg', 3, 'internet solution');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('d1ae2f0b-9fe0-4aa9-8270-4629815b75f0', 'Official Trailer (HD)', 'http://hc360.com/ut/suscipit.xml', 1, 'access');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('b6a6e8d1-7438-4e3c-9070-d3e08552883d', 'Official Trailer (HD)', 'https://paginegialle.it/ligula/vehicula/consequat/morbi.js', 5, 'homogeneous');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('31371e5d-db1d-4771-8b38-81e3a4e22a1c', 'Official Trailer (HD)', 'https://tiny.cc/dui/nec/nisi/volutpat/eleifend.xml', 4, 'groupware');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('b6b67ed1-59f6-4bde-8c97-1edef71e6667', 'Official Trailer (HD)', 'http://shinystat.com/pede/venenatis/non.png', 1, 'Compatible');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('d36692bb-3fff-4493-8968-058f8741ea17', 'Official Trailer (HD)', 'http://mediafire.com/luctus/et/ultrices.html', 3, 'systemic');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('ca5529a2-542a-4295-bd5c-b6f317f032ed', 'Official Trailer (HD)', 'http://japanpost.jp/vestibulum/ac.jsp', 2, 'bottom-line');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('9ffdc717-9b2b-4c67-a109-327b0db0c2e2', 'Official Trailer (HD)', 'http://hc360.com/hendrerit/at/vulputate/vitae/nisl.xml', 3, '6th generation');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('43cfdf3d-0ef5-4b12-8284-d80cb309fa2a', 'Official Trailer (HD)', 'http://123-reg.co.uk/bibendum/felis/sed/interdum/venenatis.jpg', 3, 'transitional');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('109a86a9-9222-4224-9dde-bd0d066f6785', 'Official Trailer (HD)', 'http://nydailynews.com/imperdiet/nullam/orci/pede/venenatis/non/sodales.json', 5, 'attitude');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('24194800-12db-4a38-89ea-dc4ab8348c55', 'Official Trailer (HD)', 'http://spotify.com/eu/interdum/eu/tincidunt/in.jsp', 3, 'attitude');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('9b7b6baf-8e48-47d8-b2da-a4f4bbc2c697', 'Official Trailer (HD)', 'http://nifty.com/at/vulputate/vitae.png', 1, 'logistical');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('63831aa2-88eb-40b3-bf8e-958c0280e992', 'Official Trailer (HD)', 'http://seesaa.net/metus/arcu/adipiscing/molestie/hendrerit/at/vulputate.xml', 4, 'high-level');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('5a66f4ec-02b8-43a5-b777-012fa1b9f736', 'Official Trailer (HD)', 'http://wordpress.org/amet.jsp', 3, 'exuding');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('82b210c9-8770-4341-b271-1a24c294ee2b', 'Official Trailer (HD)', 'http://amazon.com/porta/volutpat/quam/pede/lobortis/ligula.xml', 4, 'bi-directional');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('2eb1e315-fbd8-4b8b-ae6a-da3c243f6eec', 'Official Trailer (HD)', 'http://fastcompany.com/lectus/vestibulum/quam/sapien/varius/ut/blandit.jpg', 2, 'model');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('fe4a1c65-44b9-466e-a1e9-8e9acf0772a9', 'Official Trailer (HD)', 'https://dion.ne.jp/vel/lectus/in.jsp', 1, 'non-volatile');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('89809bc0-5746-4c25-b3e2-19e06e90dd67', 'Official Trailer (HD)', 'https://macromedia.com/scelerisque/mauris/sit/amet/eros/suspendisse/accumsan.html', 2, 'middleware');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('e19291db-f028-48bb-9340-cfb1620b0b86', 'Official Trailer (HD)', 'http://arizona.edu/tortor/duis/mattis/egestas.js', 3, 'instruction set');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('704860f7-cfa1-4e4b-be60-cab8de5e8b45', 'Official Trailer (HD)', 'http://msn.com/dolor/quis.png', 5, 'Innovative');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('f0f9d27e-3502-453c-a3f2-c9ac2586b815', 'Official Trailer (HD)', 'https://icio.us/pellentesque/quisque/porta/volutpat/erat/quisque/erat.jsp', 4, 'attitude-oriented');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('0ec79734-0b9f-49de-a067-297ff0eae073', 'Official Trailer (HD)', 'http://ted.com/cras/pellentesque/volutpat/dui.jsp', 1, 'Polarised');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('7a8a137a-7045-4d74-951a-86db6d2052dd', 'Official Trailer (HD)', 'https://blogger.com/erat/id.jsp', 1, 'focus group');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('04c31549-9a14-4b19-8fe9-5ab34cc1b96d', 'Official Trailer (HD)', 'http://domainmarket.com/quis/tortor/id/nulla/ultrices/aliquet.png', 4, 'web-enabled');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('49c890fd-a20f-4f13-832d-7db4746c0e74', 'Official Trailer (HD)', 'https://foxnews.com/id/ornare/imperdiet/sapien/urna/pretium/nisl.html', 2, 'zero administration');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('c4b59a51-c7f0-4c8c-8b24-4b923826cd82', 'Official Trailer (HD)', 'https://redcross.org/ante/ipsum.jsp', 3, 'encryption');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('b116a2aa-3abc-46fc-88fb-b92dbaebe3b6', 'Official Trailer (HD)', 'http://discovery.com/tempus/sit/amet/sem/fusce/consequat.js', 1, 'zero defect');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('014b84a0-a9e6-41aa-94ba-3a1012391841', 'Official Trailer (HD)', 'https://cornell.edu/pretium/iaculis/diam/erat/fermentum/justo.png', 2, 'Devolved');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('4e224aa9-4e08-4b79-80c6-1e7a9e449d1d', 'Official Trailer (HD)', 'https://ox.ac.uk/pede/libero/quis/orci.aspx', 3, 'throughput');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('d3f69138-24ad-4341-b47d-5658930325cc', 'Official Trailer (HD)', 'https://youtu.be/leo.json', 1, 'Up-sized');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('b0e80d9f-0e94-4e96-87aa-c6e1ab629052', 'Official Trailer (HD)', 'https://adobe.com/laoreet/ut/rhoncus.jsp', 5, 'Optional');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('cf092779-36a7-47c6-af01-b29157255689', 'Official Trailer (HD)', 'http://unesco.org/vel/ipsum/praesent.html', 2, 'value-added');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('5e7ded33-a24f-46f2-8b51-89843940adc5', 'Official Trailer (HD)', 'https://friendfeed.com/erat/nulla/tempus/vivamus.html', 1, 'bifurcated');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('44ec7fa3-36d7-44c0-9b21-7235be3f6b0f', 'Official Trailer (HD)', 'https://goo.gl/donec/vitae/nisi/nam/ultrices/libero/non.png', 2, 'Expanded');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('17aa2748-1949-4857-bd97-4342e0fe4ca9', 'Official Trailer (HD)', 'https://tinyurl.com/nulla/suscipit/ligula/in/lacus.aspx', 2, 'capability');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('50f412de-a194-43f7-beee-8137d0b4cfa6', 'Official Trailer (HD)', 'http://chronoengine.com/vitae/nisl.png', 5, 'hierarchy');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('f9823209-b94f-4a03-bc53-5a6a60aa3a29', 'Official Trailer (HD)', 'https://jugem.jp/aliquet/maecenas/leo.json', 1, 'Innovative');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('c9cf809c-21db-464c-bc8b-19f3d09f40ae', 'Official Trailer (HD)', 'https://arizona.edu/interdum/in/ante/vestibulum/ante/ipsum/primis.aspx', 5, 'responsive');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('8751e996-16b9-4f70-8e15-f143f4843e26', 'Official Trailer (HD)', 'http://drupal.org/nisi/nam.html', 2, 'Face to face');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('de702400-1227-4fb3-9501-c836d93055d7', 'Official Trailer (HD)', 'http://infoseek.co.jp/aenean/lectus/pellentesque/eget/nunc.jsp', 5, 'Intuitive');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('c243e057-bdb0-4f0a-8189-df91b2759207', 'Official Trailer (HD)', 'http://hhs.gov/posuere/cubilia/curae/donec/pharetra.js', 3, 'focus group');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('8ae3a327-b2c7-436d-801b-647d81942c09', 'Official Trailer (HD)', 'https://ftc.gov/aliquam.jpg', 1, 'empowering');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('2bdc5937-183a-4e8d-94fa-322ed0079cd1', 'Official Trailer (HD)', 'https://washingtonpost.com/elit/proin/interdum/mauris.jsp', 1, 'Progressive');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('374a6933-939b-4f93-91c8-16e663039222', 'Official Trailer (HD)', 'https://naver.com/dolor/sit.png', 5, 'projection');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('7d514978-c5bc-4693-9986-63917bbb52e4', 'Official Trailer (HD)', 'https://acquirethisname.com/ut/odio/cras/mi/pede.jpg', 2, 'Total');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('30ca996e-e4eb-4d88-83a9-cc18aff643a1', 'Official Trailer (HD)', 'https://51.la/sed/justo/pellentesque/viverra/pede/ac.html', 2, 'Intuitive');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('7f80417e-7187-4c12-b09a-a02128a2a20b', 'Official Trailer (HD)', 'http://1688.com/justo/sollicitudin/ut.json', 4, 'Cloned');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('ba95513b-e383-4df8-b798-4b3086700318', 'Official Trailer (HD)', 'http://economist.com/donec/posuere/metus/vitae/ipsum/aliquam/non.html', 1, 'forecast');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('20d25275-ebe1-490b-8d8c-d1b5e37e4958', 'Official Trailer (HD)', 'http://hc360.com/amet/justo/morbi/ut.jsp', 5, 'Fully-configurable');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('d7d5c6a6-8af8-43a7-b00d-1808be35f076', 'Official Trailer (HD)', 'http://amazon.de/turpis/elementum/ligula/vehicula.jpg', 2, 'website');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('1df36281-5b74-4185-85b4-10c8f76762ba', 'Official Trailer (HD)', 'http://blogtalkradio.com/enim/sit/amet/nunc.json', 3, 'Expanded');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('e4f739a8-5493-4da1-8071-b326163d97a2', 'Official Trailer (HD)', 'http://netvibes.com/orci.json', 1, 'success');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('e9fc9023-0e94-418a-b67a-59e402c6fe25', 'Official Trailer (HD)', 'https://admin.ch/id/justo/sit/amet/sapien/dignissim.json', 4, 'Pre-emptive');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('679e00d2-6905-41b4-bd19-bec2ca4ff130', 'Official Trailer (HD)', 'https://dailymail.co.uk/molestie/lorem/quisque/ut/erat/curabitur/gravida.jpg', 5, 'productivity');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('091f6fef-8a5e-4f67-8d41-ff469deeb35c', 'Official Trailer (HD)', 'https://hibu.com/magnis/dis/parturient/montes.js', 2, 'fresh-thinking');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('62ffd5f1-31c6-479f-b797-790b0c05d922', 'Official Trailer (HD)', 'http://dropbox.com/magnis/dis/parturient/montes/nascetur/ridiculus/mus.html', 2, 'Inverse');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('71393dcd-9bde-4226-b63e-c1ea612b901c', 'Official Trailer (HD)', 'http://home.pl/ornare/imperdiet/sapien/urna/pretium/nisl.jpg', 2, 'Reduced');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('b160af77-36d3-4730-af31-d879587320e0', 'Official Trailer (HD)', 'https://sogou.com/sed/accumsan/felis/ut.jpg', 5, 'user-facing');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('0fc7a6d0-8b85-45fb-a2a9-96276630e24d', 'Official Trailer (HD)', 'https://slashdot.org/magnis/dis/parturient/montes/nascetur/ridiculus.json', 4, 'upward-trending');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('8dac8233-fb0d-4750-9dac-791dad156a11', 'Official Trailer (HD)', 'http://123-reg.co.uk/non/mauris.html', 1, 'national');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('5f51e623-81df-423c-889d-2b31b4e71e32', 'Official Trailer (HD)', 'https://godaddy.com/vestibulum/quam/sapien/varius/ut/blandit.jpg', 4, 'success');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('ef781811-71c5-4281-b137-3cf235a82dff', 'Official Trailer (HD)', 'https://jiathis.com/in/sapien.json', 1, 'logistical');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('431a7892-face-476b-88d3-2499d02c7cbd', 'Official Trailer (HD)', 'https://businesswire.com/eleifend/quam.png', 5, 'matrices');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('2f96e905-3183-440f-a450-d3d999d84bd9', 'Official Trailer (HD)', 'http://tuttocitta.it/nunc/viverra/dapibus/nulla.html', 4, 'Proactive');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('aafaffad-2517-4a05-85a9-d59840bf1253', 'Official Trailer (HD)', 'http://google.co.uk/neque/sapien/placerat.js', 2, 'groupware');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('9928d7f5-48e8-4d3e-ab22-701a9a0ee581', 'Official Trailer (HD)', 'http://comcast.net/ligula/suspendisse/ornare/consequat/lectus/in/est.jsp', 3, 'Automated');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('488d861e-863c-4e64-a7e8-9bbd55709708', 'Official Trailer (HD)', 'https://cpanel.net/diam/cras/pellentesque/volutpat/dui.js', 3, 'Optional');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('1483f17c-bae0-405c-89f5-8030920673f2', 'Official Trailer (HD)', 'http://addthis.com/duis.js', 3, 'Intuitive');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('0b596667-03f6-4d28-aa7b-34935ea0e464', 'Official Trailer (HD)', 'http://google.com.au/sit/amet.jpg', 4, 'Distributed');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('bf5aa9c3-33cb-4c28-ab93-d58fddc3c542', 'Official Trailer (HD)', 'https://e-recht24.de/pede/libero/quis/orci.html', 3, 'attitude');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('00f09a11-7a9d-4d66-b53a-514bbd0fc15d', 'Official Trailer (HD)', 'https://people.com.cn/non/interdum/in/ante.aspx', 1, 'Seamless');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('50f074cc-586f-4f40-8485-96fd9881012b', 'Official Trailer (HD)', 'http://ftc.gov/nulla.jpg', 2, 'Polarised');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('9ff8c5ed-19bb-406c-9b31-84ee1e259ed2', 'Official Trailer (HD)', 'http://addthis.com/lectus/suspendisse/potenti/in/eleifend/quam/a.js', 1, 'Object-based');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('231a6568-b4de-491e-a3b5-c765135f5d4e', 'Official Trailer (HD)', 'http://reverbnation.com/sed/lacus.jsp', 3, 'Decentralized');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('15408817-289d-47e7-bae4-10743a294cad', 'Official Trailer (HD)', 'http://independent.co.uk/nulla/justo/aliquam/quis/turpis/eget/elit.png', 5, 'intranet');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('ebdb14a3-65c8-496d-83f7-bfd43f686d66', 'Official Trailer (HD)', 'http://comcast.net/nibh/ligula/nec/sem/duis/aliquam.png', 2, 'Virtual');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('b61df402-8ee4-4013-ae8b-893b8da07651', 'Official Trailer (HD)', 'http://mac.com/ultrices/phasellus/id/sapien/in/sapien.jsp', 4, 'infrastructure');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('0731c343-24c0-42ae-916b-874d17c380be', 'Official Trailer (HD)', 'http://fda.gov/nunc/proin/at/turpis/a/pede/posuere.json', 1, 'Seamless');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('4f4fea4f-8973-4a14-aa96-ce10c0c5a2b5', 'Official Trailer (HD)', 'https://hexun.com/condimentum.jsp', 5, 'Vision-oriented');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('ebfc806b-2175-4170-a973-4fc2379225b5', 'Official Trailer (HD)', 'http://wiley.com/nec/nisi.json', 2, 'Digitized');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('4806bfa7-2802-4099-ac8f-d51bd796723a', 'Official Trailer (HD)', 'http://amazon.co.uk/felis/donec/semper/sapien/a/libero/nam.js', 2, 'complexity');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('1c4849bc-95fb-42f2-a562-e615f6bfaeeb', 'Official Trailer (HD)', 'http://auda.org.au/suscipit/ligula/in/lacus/curabitur/at.aspx', 5, 'Switchable');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('4120fbae-2664-482e-973f-40179b21c372', 'Official Trailer (HD)', 'http://quantcast.com/sed/sagittis/nam/congue/risus/semper.aspx', 5, 'full-range');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('5e7634a6-e3f2-4f1f-8634-74d857a46086', 'Official Trailer (HD)', 'http://cloudflare.com/pretium/quis.js', 4, 'empowering');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('f9b151ba-f54b-4c29-9448-03e16cc61bd2', 'Official Trailer (HD)', 'https://stumbleupon.com/consectetuer/adipiscing/elit/proin/risus/praesent.jpg', 2, 'asymmetric');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('cda2827e-0a0b-4be2-916c-9359e1189b78', 'Official Trailer (HD)', 'http://odnoklassniki.ru/volutpat/erat.png', 1, 'adapter');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('a41d6a7b-deed-4659-9efd-2ad583599f95', 'Official Trailer (HD)', 'http://is.gd/ultrices.png', 2, 'De-engineered');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('01d7cfa5-3baf-4264-b3ff-052f532e496a', 'Official Trailer (HD)', 'http://opera.com/volutpat.html', 3, 'encryption');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('be7f131d-93ff-41c3-ab13-c93578a039da', 'Official Trailer (HD)', 'https://vk.com/lacus/at/turpis/donec/posuere/metus/vitae.xml', 4, 'Triple-buffered');
insert into youtube_trailer_entity (id, name, url, duration, channel) values ('89bdf071-4b61-49aa-9f2a-2b500e492de2', 'Official Trailer (HD)', 'http://zdnet.com/eu/est/congue/elementum/in.jpg', 5, 'complexity');


--Movie

insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('74d10db7-03b8-4050-a663-11814f611e52','Item, The','http://google.com.br/vel/est/donec.png',4,'Indonesia','1925-06-03',3,'5e942ab8-e045-4048-896c-8f79e5ce2bc7','2fb83849-05f9-4e4e-954b-5e736c2d7445','fe4d0266-25e7-4b13-b89d-bdabfdef56c1');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('06393d9b-e85d-44e7-94e4-90e6804e0336','Godzilla','http://who.int/orci/luctus/et.jsp',3,'Indonesia','1925-06-03',3,'7910bf0b-f4d4-4137-bec7-d516fe1c7f0d','72b68ea2-cc16-4624-a5cf-91d18545a100','7384f4a2-4f26-4954-900d-5a76e31d201c');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('48fe667d-1c84-438d-9f2d-e6fd18a1f3fe','Mists of Avalon, The','http://goo.gl/pellentesque.jpg',3,'United States','1925-06-03',4,'a17ced5e-ee68-4228-bf86-bec7a865ae54','51623e47-15db-41df-a178-c6467371635b','fbff48a6-3917-40a8-a4a9-7b9c95a86690');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('156c889c-4012-487a-aada-4d255b000d7d','Show of Force, A','http://google.fr/sed/vel/enim/sit/amet/nunc/viverra.png',1,'China','1925-06-03',3,'9e89588c-6c95-4c40-bce7-618c33b502a7','2b087e1d-0eab-4a6f-b486-09221d32326d','3bd22f0a-fd46-4ccb-9655-e03c96fc0011');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('2a8c7ed1-3b2e-4fd5-a56d-cfb1eb41226a','Knights of Badassdom','https://wikipedia.org/rhoncus.html',3,'Cyprus','1925-06-03',2,'71e0af28-a497-4a3a-be89-1e752604ed9c','c8ce4b0b-ab05-4e00-8ae8-81336b88999c','3934418d-5854-4add-bafd-8f6299e1aaca');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('f0dcd0f0-c7dd-49b6-ba8c-971212a3e933','Look Who''s Talking','http://tiny.cc/facilisi.jsp',4,'South Korea','1925-06-03',4,'c8d4cf57-1f43-4ff4-ad89-8e2b83acd4b7','fa6ab762-b1e6-4a6a-855a-1906fe006817','fc611627-9a9f-4c78-a8e1-be7572f5a130');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('792a70c1-1df6-4488-a8f3-a25ded9252df','Lucky Texan, The','https://washington.edu/luctus/et/ultrices/posuere/cubilia.jsp',1,'Albania','1925-06-03',2,'e8a05c02-83f8-4c5e-a83c-edd992d0d407','90d5fd9a-44da-4f09-94cb-92177f2b1ac6','d9cb0390-5b39-48fe-bf5b-4bd9d6d7fb32');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('cba729b6-12c4-42fe-a604-caf51023371a','Division III: Football''s Finest','http://w3.org/amet/justo/morbi/ut.xml',5,'Portugal','1925-06-03',5,'acfa10dd-b444-4ac3-a404-0e0cdbc73133','720c08ea-cd55-47cf-9286-9acfba6da12d','c3bed396-2dbd-4237-8ed3-e0d744570dbc');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('00973c26-0b8b-4697-b9f6-fe2157ee926a','Manos: The Hands of Fate','https://4shared.com/tincidunt/nulla/mollis/molestie.png',3,'Armenia','1925-06-03',4,'dc07b1f6-61ec-4625-b955-53a596c029f3','f76ae1d2-7a93-4506-96e3-e3173a3ee7fb','f4372c83-60e5-4ac8-b5ec-cd84ece51274');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('f0102804-a7cc-4a3a-a71f-ec2a5be09dd0','Man Who Planted Trees, The (Homme qui plantait des arbres, L'')','http://jalbum.net/magna/vestibulum/aliquet/ultrices.html',1,'Indonesia','1925-06-03',1,'1e63035b-fac7-43ca-8496-fe0c8974b242','95f75c58-d439-4897-99a1-6397f64bdd79','2e147042-0e7b-4819-b297-dc9428f97215');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('9b52751c-ae9b-4071-9866-44df4f820718','Good For Nothing','http://blinklist.com/interdum/in/ante/vestibulum/ante/ipsum/primis.jpg',3,'Russia','1925-06-03',5,'60048430-50ed-4330-be65-e49d4959f76b','2fb83849-05f9-4e4e-954b-5e736c2d7445','763b221e-025a-47ef-a06a-467b24988d71');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('01d09146-57c7-480a-8826-996334aec868','Cheers for Miss Bishop','https://ifeng.com/accumsan/odio.aspx',4,'Greece','1925-06-03',5,'42854243-5833-4867-8c0f-7ccf80cde8e8','72b68ea2-cc16-4624-a5cf-91d18545a100','d1ae2f0b-9fe0-4aa9-8270-4629815b75f0');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('7e7b0b81-bd38-43cd-b10d-4981c49ad02a','GoldenEye','http://utexas.edu/congue.jpg',3,'China','1925-06-03',2,'37f07a23-73d0-49f7-b411-4630b746876b','51623e47-15db-41df-a178-c6467371635b','b6a6e8d1-7438-4e3c-9070-d3e08552883d');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('16ac6176-e5a7-4e5d-b1f7-e53134c67e16','Night Stalker, The','https://nih.gov/sed/lacus/morbi/sem.png',3,'Colombia','1925-06-03',4,'07ec84aa-b17d-445b-a22c-dcdc964406d9','2b087e1d-0eab-4a6f-b486-09221d32326d','31371e5d-db1d-4771-8b38-81e3a4e22a1c');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('f173d56b-8ed5-4c0c-a92e-ba48a20a8671','Cousin Bette','https://illinois.edu/vitae/quam/suspendisse/potenti.jsp',1,'Philippines','1925-06-03',2,'9e9513c3-4dbe-4e93-9847-0949b05bc0dd','c8ce4b0b-ab05-4e00-8ae8-81336b88999c','b6b67ed1-59f6-4bde-8c97-1edef71e6667');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('cbf725ba-584f-41db-85dc-39db39d99997','Robin Hood','http://redcross.org/nulla/sed.html',4,'Thailand','1925-06-03',3,'97cdcffd-4330-4e41-9cb0-b0b227301973','fa6ab762-b1e6-4a6a-855a-1906fe006817','d36692bb-3fff-4493-8968-058f8741ea17');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('49667dbf-49fb-4587-afb4-0f50f8d43f34','At Long Last Love','https://seattletimes.com/urna/ut/tellus/nulla/ut/erat.html',2,'Czech Republic','1925-06-03',1,'b2e413ab-5268-4dc9-b553-cbbdad87af1a','90d5fd9a-44da-4f09-94cb-92177f2b1ac6','ca5529a2-542a-4295-bd5c-b6f317f032ed');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('9cdffeee-1ab8-41ec-929a-73cd3629d13e','The Count of Monte Cristo','http://fema.gov/consequat/ut/nulla/sed/accumsan/felis.png',1,'Indonesia','1925-06-03',5,'fda77232-03dd-438c-b0c3-7402f2baec77','720c08ea-cd55-47cf-9286-9acfba6da12d','9ffdc717-9b2b-4c67-a109-327b0db0c2e2');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('7d9f283f-b32e-47d1-b935-b0390113e141','Supercondriaque','https://histats.com/justo/morbi/ut.jsp',5,'Japan','1925-06-03',1,'a154feb5-7f89-4a98-b9c3-d144488044e5','f76ae1d2-7a93-4506-96e3-e3173a3ee7fb','43cfdf3d-0ef5-4b12-8284-d80cb309fa2a');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('06e6557c-434e-4345-8a2c-85f9c7a4089c','Scream 4','http://uiuc.edu/penatibus/et/magnis/dis.json',3,'Russia','1925-06-03',5,'3f84a5f6-2e79-4b07-88ea-d1c717b6b52e','95f75c58-d439-4897-99a1-6397f64bdd79','109a86a9-9222-4224-9dde-bd0d066f6785');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('b4a59812-602a-4b9c-ab3f-07bb87a0ec60','Arrowsmith','https://ibm.com/adipiscing/elit/proin.aspx',4,'Brazil','1925-06-03',5,'1134766a-3f09-461d-8a41-e0d25e6f1200','2fb83849-05f9-4e4e-954b-5e736c2d7445','24194800-12db-4a38-89ea-dc4ab8348c55');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('ed20c4bf-95ec-4f0a-9ad6-4bd81343d6ea','Gone Fishin''','https://umich.edu/in/leo/maecenas/pulvinar.jsp',5,'Portugal','1925-06-03',4,'0ee72dc3-c670-4107-87f3-462b1d2bae43','72b68ea2-cc16-4624-a5cf-91d18545a100','9b7b6baf-8e48-47d8-b2da-a4f4bbc2c697');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('1bf0494d-f3b5-4f89-ae19-9b146c7072e8','Powwow Highway','https://pcworld.com/vel/est/donec/odio/justo.xml',4,'South Africa','1925-06-03',1,'86bf1fca-ac99-45c3-a12e-2692a113ff60','51623e47-15db-41df-a178-c6467371635b','63831aa2-88eb-40b3-bf8e-958c0280e992');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('47f05ad0-1ece-4039-b18a-f49c95bc3c14','Short Time','https://nature.com/a/nibh/in/quis.aspx',5,'Indonesia','1925-06-03',4,'a81a0bee-f1ed-4394-b324-329c57fe3c62','2b087e1d-0eab-4a6f-b486-09221d32326d','5a66f4ec-02b8-43a5-b777-012fa1b9f736');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('221a8c1a-32fd-4262-bed9-2808b2e2c74e','Santitos','https://miitbeian.gov.cn/et/magnis/dis/parturient.jpg',1,'Philippines','1925-06-03',3,'aaac0989-5168-4361-a00e-09a3616c3e90','c8ce4b0b-ab05-4e00-8ae8-81336b88999c','82b210c9-8770-4341-b271-1a24c294ee2b');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('197d99f2-e9c7-434d-abe3-ed0bb3ce76e3','Brief Encounter','https://cbslocal.com/hendrerit.png',4,'Indonesia','1925-06-03',3,'3001cc51-eaa7-45bf-ae43-ac4ca408453d','fa6ab762-b1e6-4a6a-855a-1906fe006817','2eb1e315-fbd8-4b8b-ae6a-da3c243f6eec');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('629da8ca-19a2-426d-8124-0f1d78bc9e80','Scary Movie 5 (Scary MoVie)','http://parallels.com/libero/convallis/eget/eleifend/luctus.jpg',1,'Cameroon','1925-06-03',3,'6d888fbc-800a-4491-a627-c455b8b76ff9','90d5fd9a-44da-4f09-94cb-92177f2b1ac6','fe4a1c65-44b9-466e-a1e9-8e9acf0772a9');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('1199a6f0-6bd3-4fb2-a270-6f2655538370','College Road Trip','https://msu.edu/vitae.html',1,'China','1925-06-03',3,'db0e034c-4a40-4d13-a09a-246ce06b493b','720c08ea-cd55-47cf-9286-9acfba6da12d','89809bc0-5746-4c25-b3e2-19e06e90dd67');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('e33e30cc-48b4-4602-ae1d-9d3e3a0c17ef','Cool Runnings','http://dagondesign.com/nibh/quisque.jsp',2,'Belarus','1925-06-03',3,'ce53c270-c153-4fee-b0d6-1632e6adbaa7','f76ae1d2-7a93-4506-96e3-e3173a3ee7fb','e19291db-f028-48bb-9340-cfb1620b0b86');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('b63d0f7b-05e1-47c6-b575-b88324f002f4','Year My Voice Broke, The','https://disqus.com/diam/neque/vestibulum/eget/vulputate/ut.html',2,'China','1925-06-03',1,'179d2d6e-a9e9-409f-83e4-8bf5fe1b469e','95f75c58-d439-4897-99a1-6397f64bdd79','704860f7-cfa1-4e4b-be60-cab8de5e8b45');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('67222a1b-13c5-49a0-ad37-d1de35a98d60','Those Who Love Me Can Take the Train (Ceux qui m''aiment prendront le train)','http://sfgate.com/molestie/sed/justo/pellentesque/viverra/pede.aspx',1,'Philippines','1925-06-03',1,'6432613e-1788-4296-998f-e81a9ab74af2','2fb83849-05f9-4e4e-954b-5e736c2d7445','f0f9d27e-3502-453c-a3f2-c9ac2586b815');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('aefc4141-dc3a-443c-8d12-f79a7e13d849','Ella Enchanted','https://newyorker.com/morbi/vestibulum/velit/id/pretium/iaculis.json',1,'Indonesia','1925-06-03',1,'ac35fbb7-17e1-40be-8651-7740c17937ed','72b68ea2-cc16-4624-a5cf-91d18545a100','0ec79734-0b9f-49de-a067-297ff0eae073');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('d7084c2f-d3b6-44e6-b4e0-e78c43261fa6','Face (Visage)','http://phpbb.com/luctus/et/ultrices.xml',3,'Sweden','1925-06-03',5,'bcb56830-2560-4ddb-9a0c-234261195d35','51623e47-15db-41df-a178-c6467371635b','7a8a137a-7045-4d74-951a-86db6d2052dd');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('2c30ce34-ccd6-4ba0-8ced-7e96432187ba','Boys of St. Vincent, The','http://marketwatch.com/ut/suscipit/a/feugiat/et/eros.jpg',1,'Ecuador','1925-06-03',3,'f5911ae0-e511-418a-96c2-dc7b2ce9a456','2b087e1d-0eab-4a6f-b486-09221d32326d','04c31549-9a14-4b19-8fe9-5ab34cc1b96d');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('0b7310f9-166d-4516-bff8-204eda6e2bfc','Desert Hearts','https://npr.org/amet/sapien/dignissim/vestibulum/vestibulum/ante/ipsum.html',4,'China','1925-06-03',3,'081efe1f-9e50-4256-baf6-6dc5250491f5','c8ce4b0b-ab05-4e00-8ae8-81336b88999c','49c890fd-a20f-4f13-832d-7db4746c0e74');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('6aeb8e33-b546-4649-ae03-351386087784','New Gladiators (I guerrieri dell''anno 2072)','http://bing.com/porttitor/lacus/at/turpis/donec/posuere/metus.json',2,'Indonesia','1925-06-03',4,'578dd869-461e-4fe5-abb9-0c9161aa3701','fa6ab762-b1e6-4a6a-855a-1906fe006817','c4b59a51-c7f0-4c8c-8b24-4b923826cd82');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('e2bf9f78-afa6-4b77-93c5-8d1f26777cfa','Dr. Giggles','https://wp.com/mauris.js',5,'Ukraine','1925-06-03',5,'1b43b078-7290-45cd-85f2-236756af4037','90d5fd9a-44da-4f09-94cb-92177f2b1ac6','b116a2aa-3abc-46fc-88fb-b92dbaebe3b6');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('59702bf8-d08b-40a5-89ad-5b6415d999f0','Red Riding: 1974','https://si.edu/amet/consectetuer.xml',5,'China','1925-06-03',4,'73b7b3d8-9a4b-4d9f-814a-ec6ce96c291f','720c08ea-cd55-47cf-9286-9acfba6da12d','014b84a0-a9e6-41aa-94ba-3a1012391841');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('c9c4e857-6c8a-4243-a05d-1d08f78a44be','Black Rainbow','https://so-net.ne.jp/habitasse/platea/dictumst/maecenas/ut.js',5,'Portugal','1925-06-03',4,'6aa2b176-db0f-42a3-8ddb-50453b787094','f76ae1d2-7a93-4506-96e3-e3173a3ee7fb','4e224aa9-4e08-4b79-80c6-1e7a9e449d1d');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('2abf5157-772f-4c74-97d1-ca583e96a22c','Laugh, Clown, Laugh','https://nasa.gov/rhoncus/aliquet/pulvinar/sed.js',5,'Ukraine','1925-06-03',1,'e31b06f8-4241-4bae-99cc-180b4cda5470','95f75c58-d439-4897-99a1-6397f64bdd79','d3f69138-24ad-4341-b47d-5658930325cc');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('2877e5fb-c53b-4b96-a0d3-27066efa2844','Kids','http://sbwire.com/pellentesque/viverra/pede/ac/diam/cras/pellentesque.jsp',4,'Mexico','1925-06-03',1,'7754c53d-6897-409e-a55b-e5fd818dd126','2fb83849-05f9-4e4e-954b-5e736c2d7445','b0e80d9f-0e94-4e96-87aa-c6e1ab629052');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('33b3feae-8d36-4b60-9260-3cad44d71d5b','Laws of Gravity','http://senate.gov/in/lacus/curabitur/at/ipsum/ac/tellus.jpg',1,'Niger','1925-06-03',2,'d3aad6ad-3dec-4afa-8d81-03572617fa9b','72b68ea2-cc16-4624-a5cf-91d18545a100','cf092779-36a7-47c6-af01-b29157255689');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('ff9cebd7-a020-4ed8-b8e9-32e85d3e2928','Superman/Batman: Public Enemies','http://va.gov/quis.html',2,'Indonesia','1925-06-03',5,'3356bfe7-e2d0-4587-8b7d-847cfb12183e','51623e47-15db-41df-a178-c6467371635b','5e7ded33-a24f-46f2-8b51-89843940adc5');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('bed56c29-ac83-4c55-aeab-e892fa53fd99','Baby, the Rain Must Fall','https://nsw.gov.au/lectus/vestibulum/quam/sapien.aspx',4,'Ecuador','1925-06-03',1,'438e21f0-6228-4782-b6c1-52115a3d83c9','2b087e1d-0eab-4a6f-b486-09221d32326d','44ec7fa3-36d7-44c0-9b21-7235be3f6b0f');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('afefa090-7280-4be1-a57d-d76061de55be','Hunchback of Notre Dame, The','http://xinhuanet.com/eget/semper/rutrum/nulla/nunc/purus/phasellus.jsp',2,'Bulgaria','1925-06-03',1,'b000705e-80cd-4a40-ac89-6cf709bccf07','c8ce4b0b-ab05-4e00-8ae8-81336b88999c','17aa2748-1949-4857-bd97-4342e0fe4ca9');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('fee8ca0c-1db4-4a1e-963f-27df095109da','Farscape: The Peacekeeper Wars','https://weebly.com/curae.html',2,'Ukraine','1925-06-03',3,'453045dd-5ce7-4ec0-a562-d1d8289d6347','fa6ab762-b1e6-4a6a-855a-1906fe006817','50f412de-a194-43f7-beee-8137d0b4cfa6');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('b80c6152-538a-4563-a420-a8af8448d657','Flintstones in Viva Rock Vegas, The','http://archive.org/id/nisl/venenatis/lacinia.jpg',5,'Cameroon','1925-06-03',4,'cefdabf9-ab44-489c-bd87-fa0b54217395','90d5fd9a-44da-4f09-94cb-92177f2b1ac6','f9823209-b94f-4a03-bc53-5a6a60aa3a29');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('22efc678-0fc9-4a46-9870-c689d28af8b9','Class Action','http://ameblo.jp/eleifend.jpg',5,'China','1925-06-03',5,'8b08036b-5deb-466a-8de4-fdb7b7c71d54','720c08ea-cd55-47cf-9286-9acfba6da12d','c9cf809c-21db-464c-bc8b-19f3d09f40ae');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('d5e91ba7-70b8-4a55-90b4-a635fe06a08f','Barkleys of Broadway, The','https://uol.com.br/magna/vulputate/luctus/cum/sociis.html',1,'Poland','1925-06-03',1,'072aeeb3-730b-4bf3-8efc-796f5e004635','f76ae1d2-7a93-4506-96e3-e3173a3ee7fb','8751e996-16b9-4f70-8e15-f143f4843e26');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('a60474ab-ad4e-4d20-8f44-2fc41b210bc8','Clockers','https://forbes.com/ipsum/praesent/blandit/lacinia/erat/vestibulum.aspx',4,'Serbia','1925-06-03',1,'fb269cd7-3253-4789-ad0c-305db1222267','95f75c58-d439-4897-99a1-6397f64bdd79','de702400-1227-4fb3-9501-c836d93055d7');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('781e2e11-13ad-4c6d-ad86-fd12657d986a','Michael the Brave (Mihai Viteazul)','https://wiley.com/nulla/integer.json',1,'Bulgaria','1925-06-03',5,'16330611-3ebb-46cc-951b-ee209a575513','2fb83849-05f9-4e4e-954b-5e736c2d7445','c243e057-bdb0-4f0a-8189-df91b2759207');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('60f2b62a-0a02-4e79-837c-57dc8a3d9dad','Toy Story Toons: Partysaurus Rex','http://usa.gov/ac/leo/pellentesque/ultrices/mattis.jpg',2,'Norway','1925-06-03',1,'8dd52365-302f-484d-8715-90277f6c7479','72b68ea2-cc16-4624-a5cf-91d18545a100','8ae3a327-b2c7-436d-801b-647d81942c09');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('5320fd0e-bdc7-4edf-ba2e-1f9cede6b9ef','Attack of the 50 Ft. Woman','https://sun.com/nec/euismod/scelerisque/quam.json',3,'Thailand','1925-06-03',4,'b56eaee8-76fd-4d41-810b-3dd8ff692ba5','51623e47-15db-41df-a178-c6467371635b','2bdc5937-183a-4e8d-94fa-322ed0079cd1');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('79f5becd-994a-4e0c-91bf-f0819dfd148f','Myn Bala: Warriors of the Steppe','http://weibo.com/sapien.jsp',1,'Philippines','1925-06-03',2,'c32bb570-1edc-4f8f-8bc0-c399d5b60818','2b087e1d-0eab-4a6f-b486-09221d32326d','374a6933-939b-4f93-91c8-16e663039222');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('22e3693c-582f-4940-8f91-8487d521a4d7','Skenbart: En film om tåg','https://ebay.com/ullamcorper/purus.aspx',5,'Indonesia','1925-06-03',3,'bea6c8fd-cf3f-4b56-8b3b-606c21be53f1','c8ce4b0b-ab05-4e00-8ae8-81336b88999c','7d514978-c5bc-4693-9986-63917bbb52e4');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('2940000f-befa-4c84-b459-242e11f62425','Stranger in Town, A','http://yandex.ru/morbi/ut/odio/cras/mi/pede/malesuada.png',5,'Poland','1925-06-03',5,'1149a126-a216-4da0-8480-34b66e32724f','fa6ab762-b1e6-4a6a-855a-1906fe006817','30ca996e-e4eb-4d88-83a9-cc18aff643a1');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('28185494-5738-4f43-a809-f47d818f9b8a','97 Percent True','http://geocities.com/urna.html',3,'New Zealand','1925-06-03',5,'458e57b2-8220-4461-b5a2-c82477cd2eaa','90d5fd9a-44da-4f09-94cb-92177f2b1ac6','7f80417e-7187-4c12-b09a-a02128a2a20b');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('089d4a02-3e1d-43d2-8220-5b98ac20a609','Thieves (Voleurs, Les)','https://squarespace.com/eu/orci/mauris/lacinia/sapien.js',1,'United States','1925-06-03',1,'12feb060-1236-4770-a9ff-fbf29c81388a','720c08ea-cd55-47cf-9286-9acfba6da12d','ba95513b-e383-4df8-b798-4b3086700318');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('d47819d9-c905-461d-9bef-5dbef556ef4a','Movie Days (Bíódagar)','http://aol.com/ac/consequat/metus/sapien.jsp',3,'Ukraine','1925-06-03',4,'42a7f5a0-775b-464a-a594-c828fde6b044','f76ae1d2-7a93-4506-96e3-e3173a3ee7fb','20d25275-ebe1-490b-8d8c-d1b5e37e4958');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('7335d61c-72d5-4a4c-a75d-8e08627ab399','Manny','http://harvard.edu/sollicitudin/mi.js',3,'Philippines','1925-06-03',5,'6859e418-f2e7-4a48-a261-01a4ba807f38','95f75c58-d439-4897-99a1-6397f64bdd79','d7d5c6a6-8af8-43a7-b00d-1808be35f076');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('da118d8b-ddc8-4a51-9f05-a39ef75da972','Adventures of Mark Twain, The','https://booking.com/quam/nec/dui.html',3,'China','1925-06-03',4,'31dbbe25-8a14-4bc1-9d9c-964e88f60757','2fb83849-05f9-4e4e-954b-5e736c2d7445','1df36281-5b74-4185-85b4-10c8f76762ba');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('5383e98c-c85a-46a1-b81d-1961fdd761b2','Fugitive, The','http://geocities.jp/dui/vel/sem.json',3,'China','1925-06-03',5,'b326dd2d-8aab-4cec-99ff-9cec0b3eaab5','72b68ea2-cc16-4624-a5cf-91d18545a100','e4f739a8-5493-4da1-8071-b326163d97a2');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('a2483898-2565-48b8-a0cc-e40acd0e085e','Bedroom Window, The','http://123-reg.co.uk/id/luctus/nec/molestie.js',2,'Mongolia','1925-06-03',2,'801ea769-1424-4c32-87d7-4ff86a30b121','51623e47-15db-41df-a178-c6467371635b','e9fc9023-0e94-418a-b67a-59e402c6fe25');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('76106937-b483-47d7-adb9-37752dab8b52','Easy to Love','http://deliciousdays.com/ligula/sit/amet.jpg',4,'Chile','1925-06-03',3,'4c3301ac-1d21-49f4-a845-5730ac8d9cc6','2b087e1d-0eab-4a6f-b486-09221d32326d','679e00d2-6905-41b4-bd19-bec2ca4ff130');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('4a554aa4-56ac-4b20-8bcb-113d38cbb26b','Ossessione','http://hud.gov/in/lacus/curabitur/at/ipsum/ac.html',1,'Thailand','1925-06-03',1,'e6d26f3b-9d29-4eca-8099-eb9e60689502','c8ce4b0b-ab05-4e00-8ae8-81336b88999c','091f6fef-8a5e-4f67-8d41-ff469deeb35c');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('fecb51ab-dd53-46f2-9cdc-9459ebc82772','Golden Coach, The (Le carrosse d''or)','https://msn.com/turpis/eget/elit/sodales/scelerisque.jpg',3,'Canada','1925-06-03',4,'4eb33ad1-bd0b-4b43-bb96-0fb6ca473495','fa6ab762-b1e6-4a6a-855a-1906fe006817','62ffd5f1-31c6-479f-b797-790b0c05d922');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('315be6e6-c7df-47c6-9d60-fdab555b2e55','Reflecting Skin, The','http://shop-pro.jp/dapibus/nulla/suscipit/ligula/in/lacus/curabitur.jpg',2,'Portugal','1925-06-03',2,'96583286-6d79-4501-9c9c-7f254f866213','90d5fd9a-44da-4f09-94cb-92177f2b1ac6','71393dcd-9bde-4226-b63e-c1ea612b901c');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('75e292b4-0668-4ee1-845b-e85c814b53a8','Risky Business','https://zimbio.com/tempus/sit/amet/sem.jsp',3,'Indonesia','1925-06-03',4,'d06f4054-aee8-462d-bf60-19906efa0211','720c08ea-cd55-47cf-9286-9acfba6da12d','b160af77-36d3-4730-af31-d879587320e0');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('9b150dff-9abf-4e32-b177-b93ccef26882','We Were Here','http://github.com/lectus/suspendisse/potenti.aspx',3,'Peru','1925-06-03',4,'8c1ba6da-afda-483d-8545-dc83dd1ad510','f76ae1d2-7a93-4506-96e3-e3173a3ee7fb','0fc7a6d0-8b85-45fb-a2a9-96276630e24d');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('f0563e58-38eb-4324-ac29-458eefe98a49','Were the World Mine','http://ucoz.ru/mattis/egestas/metus/aenean/fermentum/donec.aspx',3,'Indonesia','1925-06-03',2,'a5796ad9-b1d0-4272-ac98-bae0f096af49','95f75c58-d439-4897-99a1-6397f64bdd79','8dac8233-fb0d-4750-9dac-791dad156a11');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('cdd75323-3247-4cbf-a6d9-34f07a9ed8de','Operation Endgame','https://webmd.com/nulla/ac/enim.json',1,'Philippines','1925-06-03',4,'7890787f-dfc5-479e-b827-d11a6bfd5672','2fb83849-05f9-4e4e-954b-5e736c2d7445','5f51e623-81df-423c-889d-2b31b4e71e32');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('a4bc94ed-8313-40aa-9a0b-17cddb3660bf','Halfmoon (Paul Bowles - Halbmond)','https://t-online.de/habitasse/platea/dictumst/aliquam/augue/quam/sollicitudin.json',5,'Colombia','1925-06-03',2,'04699c9e-64df-4f6b-9895-8123390ee195','72b68ea2-cc16-4624-a5cf-91d18545a100','ef781811-71c5-4281-b137-3cf235a82dff');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('f2603896-cbc1-4d13-b6ca-d62994cbe04a','Joy Luck Club, The','https://epa.gov/dui/luctus/rutrum/nulla/tellus.html',4,'Colombia','1925-06-03',5,'0b43921a-eb1b-44ba-bd7b-db416b74fe62','51623e47-15db-41df-a178-c6467371635b','431a7892-face-476b-88d3-2499d02c7cbd');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('c1773bc7-7761-4837-b908-e91466f2bc27','The Golden Eye','https://a8.net/id/justo/sit.jpg',4,'French Polynesia','1925-06-03',5,'5a69a143-843a-43e3-a9be-60cbe51456e4','2b087e1d-0eab-4a6f-b486-09221d32326d','2f96e905-3183-440f-a450-d3d999d84bd9');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('018cfe8b-9ee4-4ad0-9c39-8a967c326cea','Rookie, The','https://ameblo.jp/enim/sit/amet/nunc/viverra/dapibus/nulla.aspx',3,'China','1925-06-03',1,'6464abca-1d36-47ec-b01c-f6aeee23f5e3','c8ce4b0b-ab05-4e00-8ae8-81336b88999c','aafaffad-2517-4a05-85a9-d59840bf1253');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('e4abe670-32cd-4df4-b6bb-533e8176d49d','30 Days of Night: Dark Days','https://bbc.co.uk/proin/risus/praesent/lectus/vestibulum/quam/sapien.html',5,'Indonesia','1925-06-03',5,'8f39b37f-86c2-4507-8f8d-45aea984ff0c','fa6ab762-b1e6-4a6a-855a-1906fe006817','9928d7f5-48e8-4d3e-ab22-701a9a0ee581');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('7ac77f45-72fe-4357-a050-7b55c6916d15','Mistaken for Strangers','http://homestead.com/suspendisse/ornare/consequat/lectus/in/est/risus.js',1,'Ecuador','1925-06-03',1,'a662cd23-7068-4758-8696-33a5337fe36f','90d5fd9a-44da-4f09-94cb-92177f2b1ac6','488d861e-863c-4e64-a7e8-9bbd55709708');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('0fa9ad25-b16c-4c8f-8fa1-06e84a24038c','Streetcar Named Desire, A','https://uol.com.br/cursus/id/turpis.png',3,'China','1925-06-03',2,'b236a224-ae71-4438-89bf-ce6726827871','720c08ea-cd55-47cf-9286-9acfba6da12d','1483f17c-bae0-405c-89f5-8030920673f2');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('29e43e18-496f-4866-bd90-29ee8e6e104a','Executive Suite','https://biblegateway.com/maecenas/pulvinar/lobortis/est/phasellus/sit/amet.jpg',5,'Mongolia','1925-06-03',5,'6e539fee-805f-48e4-abbc-8ae598dffaa5','f76ae1d2-7a93-4506-96e3-e3173a3ee7fb','0b596667-03f6-4d28-aa7b-34935ea0e464');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('5f6c92d4-81b4-4bee-b1c9-8af5247f7378','Surf''s Up','https://nsw.gov.au/ligula/nec/sem.jpg',4,'China','1925-06-03',4,'358526ec-86cb-443d-ae8e-57f89abaffb6','95f75c58-d439-4897-99a1-6397f64bdd79','bf5aa9c3-33cb-4c28-ab93-d58fddc3c542');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('39662695-3e5c-47dd-aebd-9a99b6e209b7','Lower Depths, The (Les bas-fonds)','http://ehow.com/non/mi/integer/ac/neque/duis/bibendum.xml',3,'Libya','1925-06-03',3,'d0b40c8d-3d48-47b7-9ec7-6f49afbd3dec','2fb83849-05f9-4e4e-954b-5e736c2d7445','00f09a11-7a9d-4d66-b53a-514bbd0fc15d');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('5e078110-753d-4552-bcc8-9edbd7ca2465','Inside the Twin Towers','http://free.fr/luctus/et/ultrices/posuere/cubilia/curae.json',1,'China','1925-06-03',2,'9ec58d7f-19bb-40e6-865e-c2bc006e1feb','72b68ea2-cc16-4624-a5cf-91d18545a100','50f074cc-586f-4f40-8485-96fd9881012b');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('8f998474-56b9-418a-948f-1f1c5daf4d2b','Rushmore','https://noaa.gov/enim/in/tempor/turpis.xml',4,'Japan','1925-06-03',1,'7c7680dd-eea7-49ad-8633-6c72297198c2','51623e47-15db-41df-a178-c6467371635b','9ff8c5ed-19bb-406c-9b31-84ee1e259ed2');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('7ae1b597-6628-417d-ad93-59e2687d9c19','Touch','https://umn.edu/at/velit/vivamus/vel.jpg',5,'Poland','1925-06-03',5,'dfae67da-d380-4063-8dd3-99f7307f0c49','2b087e1d-0eab-4a6f-b486-09221d32326d','231a6568-b4de-491e-a3b5-c765135f5d4e');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('197fe9ba-1c9d-4885-b780-0f03a174e404','Studentfesten','http://scribd.com/sapien.jpg',5,'China','1925-06-03',5,'fb5572b2-b406-44d7-927c-6ce98b277475','c8ce4b0b-ab05-4e00-8ae8-81336b88999c','15408817-289d-47e7-bae4-10743a294cad');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('8e1e4be2-d355-47c3-8fc4-b45c2705997f','Little Man Tate','https://weibo.com/amet/turpis/elementum/ligula/vehicula.html',4,'Russia','1925-06-03',4,'262aca66-890a-45eb-95b2-3276492717fc','fa6ab762-b1e6-4a6a-855a-1906fe006817','ebdb14a3-65c8-496d-83f7-bfd43f686d66');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('02733a0d-d644-46dc-87fc-69bb6683ae4e','Man Trouble','https://intel.com/vivamus/vestibulum.jsp',1,'China','1925-06-03',1,'881f205b-bd35-43c2-9451-67930303eabd','90d5fd9a-44da-4f09-94cb-92177f2b1ac6','b61df402-8ee4-4013-ae8b-893b8da07651');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('87fddbd4-f72d-462f-8baa-01ccf241160d','Road Trip','https://sohu.com/bibendum/imperdiet/nullam/orci/pede/venenatis/non.aspx',5,'United States','1925-06-03',4,'8cb7d854-54cf-4554-8ca3-11b1b5b056ec','720c08ea-cd55-47cf-9286-9acfba6da12d','0731c343-24c0-42ae-916b-874d17c380be');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('6ce930f5-bc97-429e-8753-82bc50d56720','Wesley Willis: The Daddy of Rock ''n''Roll','https://yellowbook.com/tortor/risus/dapibus/augue/vel/accumsan/tellus.html',3,'China','1925-06-03',1,'8984055e-5a09-404e-aa69-3d9d19aa8490','f76ae1d2-7a93-4506-96e3-e3173a3ee7fb','4f4fea4f-8973-4a14-aa96-ce10c0c5a2b5');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('39186fb0-0400-4dde-98ce-43d1fc4d9d7c','Deck the Halls','http://typepad.com/lobortis/sapien/sapien/non.jsp',4,'China','1925-06-03',4,'8d92b637-d825-47ac-b4de-2724e593eae1','95f75c58-d439-4897-99a1-6397f64bdd79','ebfc806b-2175-4170-a973-4fc2379225b5');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('98d8b35d-1b5f-439e-8dcc-8973b3ff9170','Some Like It Hot','http://scientificamerican.com/ut.jsp',5,'Philippines','1925-06-03',1,'f59e1016-623e-49c1-9556-4c11d8a9b4e6','2fb83849-05f9-4e4e-954b-5e736c2d7445','4806bfa7-2802-4099-ac8f-d51bd796723a');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('ff7a05b2-1486-4bc5-afc8-1196993cf4c4','Pan Tadeusz: The Last Foray in Lithuania (Pan Tadeusz)','https://diigo.com/integer/aliquet.aspx',1,'China','1925-06-03',3,'c1bee8c6-d6ce-42f7-886a-b4a59d64963c','72b68ea2-cc16-4624-a5cf-91d18545a100','1c4849bc-95fb-42f2-a562-e615f6bfaeeb');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('c028ca08-add0-404d-a672-b77065f53469','Off and Running ','https://unicef.org/nulla.js',1,'Russia','1925-06-03',4,'452d203f-8147-41ed-a297-ef96469b7978','51623e47-15db-41df-a178-c6467371635b','4120fbae-2664-482e-973f-40179b21c372');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('50493a28-a5d4-4610-807e-eac9abd62de1','Battle of Britain, The (Why We Fight, 4)','http://dedecms.com/augue/quam/sollicitudin/vitae/consectetuer/eget/rutrum.json',1,'Portugal','1925-06-03',2,'3bb7fdbb-1d66-4223-829f-e70f1c0b5fbf','2b087e1d-0eab-4a6f-b486-09221d32326d','5e7634a6-e3f2-4f1f-8634-74d857a46086');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('4cada5a2-e7ff-4856-a784-6838acefa434','The Front','http://phoca.cz/quisque/erat/eros/viverra/eget.js',4,'Ireland','1925-06-03',1,'4abbfd31-4cb0-4ca8-b1ee-6aa030a7e990','c8ce4b0b-ab05-4e00-8ae8-81336b88999c','f9b151ba-f54b-4c29-9448-03e16cc61bd2');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('3379eeef-475e-40c6-9d64-b838b346b133','Gnomeo & Juliet','https://ehow.com/dui/nec/nisi.xml',4,'Russia','1925-06-03',1,'43f4196f-b99c-4db5-ad94-dcf97707a9a6','fa6ab762-b1e6-4a6a-855a-1906fe006817','cda2827e-0a0b-4be2-916c-9359e1189b78');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('4a5cd227-4ce3-4942-9cf3-6296c53e7948','Undercover Blues','https://elpais.com/aenean/lectus.js',3,'Poland','1925-06-03',4,'ed5c2887-94ef-4936-961f-3845ca32ad23','90d5fd9a-44da-4f09-94cb-92177f2b1ac6','a41d6a7b-deed-4659-9efd-2ad583599f95');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('c4019bf8-5672-4f79-8fbe-fa5298f0c59c','Killer Legends','https://shutterfly.com/orci/vehicula/condimentum/curabitur/in/libero.aspx',2,'Czech Republic','1925-06-03',1,'b3fe9e38-eb93-491f-bf16-ecf8aee94590','720c08ea-cd55-47cf-9286-9acfba6da12d','01d7cfa5-3baf-4264-b3ff-052f532e496a');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('4c00b960-8c05-48ef-90db-7565c01db3c1','Chain Lightning','http://mozilla.com/maecenas.aspx',1,'Japan','1925-06-03',2,'8c0f104e-df27-4528-ab05-6a03e3bbb81b','f76ae1d2-7a93-4506-96e3-e3173a3ee7fb','be7f131d-93ff-41c3-ab13-c93578a039da');
insert into movie_entity (id, title, poster, duration, country, "releaseDate", popularity, "directorId", "genreId", "youtubeTrailerId") values ('0c345602-453e-49ae-9218-7d8370107e50','Admission','https://youtube.com/eget/semper/rutrum/nulla/nunc.json',3,'China','1925-06-03',1,'f69f2723-a4ea-495e-9bc1-4be019a6be33','95f75c58-d439-4897-99a1-6397f64bdd79','89bdf071-4b61-49aa-9f2a-2b500e492de2');

--Movie-Actor

insert into movie_entity_actors_actor_entity values ('74d10db7-03b8-4050-a663-11814f611e52','fa540a31-2c26-42dc-afb5-2cd30af6a88e');
insert into movie_entity_actors_actor_entity values ('06393d9b-e85d-44e7-94e4-90e6804e0336','4499e858-3ea4-47c3-8515-32f85d32bbc2');
insert into movie_entity_actors_actor_entity values ('48fe667d-1c84-438d-9f2d-e6fd18a1f3fe','dba451d9-8103-4997-b475-44baacdedc1c');
insert into movie_entity_actors_actor_entity values ('156c889c-4012-487a-aada-4d255b000d7d','beaeb2b0-b10f-487a-bf68-794161e00acf');
insert into movie_entity_actors_actor_entity values ('2a8c7ed1-3b2e-4fd5-a56d-cfb1eb41226a','edf80966-0535-4b0d-8e29-23c9d661203a');
insert into movie_entity_actors_actor_entity values ('f0dcd0f0-c7dd-49b6-ba8c-971212a3e933','20618814-9005-4426-9bc0-81035ecd709a');
insert into movie_entity_actors_actor_entity values ('792a70c1-1df6-4488-a8f3-a25ded9252df','4e067528-6499-4911-b640-6f584c6ff8b1');
insert into movie_entity_actors_actor_entity values ('cba729b6-12c4-42fe-a604-caf51023371a','f1d8ad7c-7945-4e7e-a0e2-46086495b0eb');
insert into movie_entity_actors_actor_entity values ('00973c26-0b8b-4697-b9f6-fe2157ee926a','f527e864-c2f8-4d94-8c33-70178d9ebd4a');
insert into movie_entity_actors_actor_entity values ('f0102804-a7cc-4a3a-a71f-ec2a5be09dd0','8a3f199b-8f52-4099-ae3c-50cd05eb7778');
insert into movie_entity_actors_actor_entity values ('9b52751c-ae9b-4071-9866-44df4f820718','b148f869-bab1-4958-9938-1e07325d92b8');
insert into movie_entity_actors_actor_entity values ('01d09146-57c7-480a-8826-996334aec868','489b4ad9-03ed-4b79-8756-f1f383497135');
insert into movie_entity_actors_actor_entity values ('7e7b0b81-bd38-43cd-b10d-4981c49ad02a','44050c5c-ef09-43d6-8b79-97fc9f082c74');
insert into movie_entity_actors_actor_entity values ('16ac6176-e5a7-4e5d-b1f7-e53134c67e16','290e5548-cdde-42f8-9697-21cabf928185');
insert into movie_entity_actors_actor_entity values ('f173d56b-8ed5-4c0c-a92e-ba48a20a8671','cd8630ff-09f4-4191-85c1-e33b20766ab3');
insert into movie_entity_actors_actor_entity values ('cbf725ba-584f-41db-85dc-39db39d99997','299611e5-8756-4f16-b2eb-57c1ab8cf714');
insert into movie_entity_actors_actor_entity values ('49667dbf-49fb-4587-afb4-0f50f8d43f34','33a1a859-8f16-4dbd-b157-660008d394cb');
insert into movie_entity_actors_actor_entity values ('9cdffeee-1ab8-41ec-929a-73cd3629d13e','44bb4a6c-22fd-4ce3-b443-86f322327eb5');
insert into movie_entity_actors_actor_entity values ('7d9f283f-b32e-47d1-b935-b0390113e141','758e4433-98ca-45ec-8ce7-6d395ade40f1');
insert into movie_entity_actors_actor_entity values ('06e6557c-434e-4345-8a2c-85f9c7a4089c','8d72b6d0-bbd5-429d-b74a-f55fbc7a2e77');
insert into movie_entity_actors_actor_entity values ('b4a59812-602a-4b9c-ab3f-07bb87a0ec60','110f56bf-cee2-4d92-a7f4-2a6a8e701b7e');
insert into movie_entity_actors_actor_entity values ('ed20c4bf-95ec-4f0a-9ad6-4bd81343d6ea','9d7769c4-074a-4312-8e6a-d8ae89baba65');
insert into movie_entity_actors_actor_entity values ('1bf0494d-f3b5-4f89-ae19-9b146c7072e8','606cae9e-eae9-4a9a-b035-278abe89aa1a');
insert into movie_entity_actors_actor_entity values ('47f05ad0-1ece-4039-b18a-f49c95bc3c14','71a7c91d-f999-4bd9-88e4-2ebf671c234b');
insert into movie_entity_actors_actor_entity values ('221a8c1a-32fd-4262-bed9-2808b2e2c74e','904be10c-e989-4b27-ac8f-7f665390249c');
insert into movie_entity_actors_actor_entity values ('197d99f2-e9c7-434d-abe3-ed0bb3ce76e3','54232141-3da5-4e2e-be95-a6bc8813eb97');
insert into movie_entity_actors_actor_entity values ('629da8ca-19a2-426d-8124-0f1d78bc9e80','1316333f-514e-42b4-9422-d47f23ca54dc');
insert into movie_entity_actors_actor_entity values ('1199a6f0-6bd3-4fb2-a270-6f2655538370','91f1b19c-eac0-485b-9fd3-d7d87a5fe123');
insert into movie_entity_actors_actor_entity values ('e33e30cc-48b4-4602-ae1d-9d3e3a0c17ef','912c42f3-2ec0-4d83-8eef-d847b5c91538');
insert into movie_entity_actors_actor_entity values ('b63d0f7b-05e1-47c6-b575-b88324f002f4','f55183ab-fa3f-451f-9eaf-48300ab2df52');
insert into movie_entity_actors_actor_entity values ('67222a1b-13c5-49a0-ad37-d1de35a98d60','90c97cbb-5504-4a85-adc4-28a62fd77c9c');
insert into movie_entity_actors_actor_entity values ('aefc4141-dc3a-443c-8d12-f79a7e13d849','25c36793-d831-4b28-a557-499f7e30c30c');
insert into movie_entity_actors_actor_entity values ('d7084c2f-d3b6-44e6-b4e0-e78c43261fa6','ae8299a0-5225-4a9a-8a4c-c26e16e663ae');
insert into movie_entity_actors_actor_entity values ('2c30ce34-ccd6-4ba0-8ced-7e96432187ba','f9b3fcd0-f58c-4b95-85d3-4f2fd7a48612');
insert into movie_entity_actors_actor_entity values ('0b7310f9-166d-4516-bff8-204eda6e2bfc','a03627a8-9fb2-4a51-ba9f-f3fad4c4349d');
insert into movie_entity_actors_actor_entity values ('6aeb8e33-b546-4649-ae03-351386087784','a6fd75e7-2e76-4d6c-9ebe-509fd1d3d05d');
insert into movie_entity_actors_actor_entity values ('e2bf9f78-afa6-4b77-93c5-8d1f26777cfa','64a4df41-eca1-4dcd-9a92-02f6f7d09d2b');
insert into movie_entity_actors_actor_entity values ('59702bf8-d08b-40a5-89ad-5b6415d999f0','093761eb-0e48-429b-b6e3-af33f4653ad0');
insert into movie_entity_actors_actor_entity values ('c9c4e857-6c8a-4243-a05d-1d08f78a44be','ac0528ed-7774-444b-8c4b-645d20fae4f5');
insert into movie_entity_actors_actor_entity values ('2abf5157-772f-4c74-97d1-ca583e96a22c','09d4d4cf-68df-4996-8eb2-db0dabe6afc7');
insert into movie_entity_actors_actor_entity values ('2877e5fb-c53b-4b96-a0d3-27066efa2844','778b95f2-61d8-4569-95a0-87538653f858');
insert into movie_entity_actors_actor_entity values ('33b3feae-8d36-4b60-9260-3cad44d71d5b','04b9f2e4-3149-4e9c-937d-a531d6f892d1');
insert into movie_entity_actors_actor_entity values ('ff9cebd7-a020-4ed8-b8e9-32e85d3e2928','c99b5df1-df98-4154-8c7f-00e804508140');
insert into movie_entity_actors_actor_entity values ('bed56c29-ac83-4c55-aeab-e892fa53fd99','a313fd3a-754d-4bd4-ba1e-5e1abd093087');
insert into movie_entity_actors_actor_entity values ('afefa090-7280-4be1-a57d-d76061de55be','04f03373-898d-4bb4-a879-44ed8319dc37');
insert into movie_entity_actors_actor_entity values ('fee8ca0c-1db4-4a1e-963f-27df095109da','cc53570c-856c-4cda-a2c6-4e4ad81e78dd');
insert into movie_entity_actors_actor_entity values ('b80c6152-538a-4563-a420-a8af8448d657','8eadddb0-1232-4cce-8b4f-141cd4902d9f');
insert into movie_entity_actors_actor_entity values ('22efc678-0fc9-4a46-9870-c689d28af8b9','8b637595-7611-4e2d-b52e-5b3011716c91');
insert into movie_entity_actors_actor_entity values ('d5e91ba7-70b8-4a55-90b4-a635fe06a08f','cf420724-9a08-4b3c-9b4a-cffadc085110');
insert into movie_entity_actors_actor_entity values ('a60474ab-ad4e-4d20-8f44-2fc41b210bc8','b3857bf0-cb00-4c16-acd4-aad7eccf5d35');
insert into movie_entity_actors_actor_entity values ('781e2e11-13ad-4c6d-ad86-fd12657d986a','69c9721c-af3a-4f0c-9063-5164b35a8577');
insert into movie_entity_actors_actor_entity values ('60f2b62a-0a02-4e79-837c-57dc8a3d9dad','8911b5bc-1e59-42cc-9d1c-c5da3f2d0d24');
insert into movie_entity_actors_actor_entity values ('5320fd0e-bdc7-4edf-ba2e-1f9cede6b9ef','21e027c9-9ac0-4575-8ae5-3f19c0cab657');
insert into movie_entity_actors_actor_entity values ('79f5becd-994a-4e0c-91bf-f0819dfd148f','e7ec8a75-95da-4da0-9b59-c945770581fd');
insert into movie_entity_actors_actor_entity values ('22e3693c-582f-4940-8f91-8487d521a4d7','ddb2e0be-ee30-492a-9647-f3c82c804cdb');
insert into movie_entity_actors_actor_entity values ('2940000f-befa-4c84-b459-242e11f62425','28579f72-262f-43fd-9222-7757a2991b71');
insert into movie_entity_actors_actor_entity values ('28185494-5738-4f43-a809-f47d818f9b8a','b4124bb0-5806-42cb-932c-d432daa15ab4');
insert into movie_entity_actors_actor_entity values ('089d4a02-3e1d-43d2-8220-5b98ac20a609','d7eaaefc-8b16-4cc7-bd8d-78acf5229cde');
insert into movie_entity_actors_actor_entity values ('d47819d9-c905-461d-9bef-5dbef556ef4a','45d4f6de-1a2d-4f84-8de9-3c86b20cd6d0');
insert into movie_entity_actors_actor_entity values ('7335d61c-72d5-4a4c-a75d-8e08627ab399','91147b5a-d2d6-4f92-b865-a680b6af8a10');
insert into movie_entity_actors_actor_entity values ('da118d8b-ddc8-4a51-9f05-a39ef75da972','b25dc2a7-696b-4feb-9400-e116a21c5ae3');
insert into movie_entity_actors_actor_entity values ('5383e98c-c85a-46a1-b81d-1961fdd761b2','325902c1-6bb5-48f9-8b0a-c686dcfb425f');
insert into movie_entity_actors_actor_entity values ('a2483898-2565-48b8-a0cc-e40acd0e085e','15176245-71d9-4557-98dc-979974445bc2');
insert into movie_entity_actors_actor_entity values ('76106937-b483-47d7-adb9-37752dab8b52','885d149d-ac7f-426d-8913-91df5cdd3d0b');
insert into movie_entity_actors_actor_entity values ('4a554aa4-56ac-4b20-8bcb-113d38cbb26b','9eabe172-8c15-4fb6-b577-fde2444f2c8c');
insert into movie_entity_actors_actor_entity values ('fecb51ab-dd53-46f2-9cdc-9459ebc82772','393fe1a8-e8e8-42a3-a8cd-5bfea1f567c6');
insert into movie_entity_actors_actor_entity values ('315be6e6-c7df-47c6-9d60-fdab555b2e55','3e396566-abb0-4bd2-beba-02890009a1ea');
insert into movie_entity_actors_actor_entity values ('75e292b4-0668-4ee1-845b-e85c814b53a8','7e3d68f2-7773-4489-b5bc-0047e134de25');
insert into movie_entity_actors_actor_entity values ('9b150dff-9abf-4e32-b177-b93ccef26882','a6d6fff4-3dc8-4846-9462-09702b1ff120');
insert into movie_entity_actors_actor_entity values ('f0563e58-38eb-4324-ac29-458eefe98a49','b5d6aa5e-91e8-410b-9563-c0916fd167cd');
insert into movie_entity_actors_actor_entity values ('cdd75323-3247-4cbf-a6d9-34f07a9ed8de','d7501458-b260-4731-a8a6-36ac1f846d2c');
insert into movie_entity_actors_actor_entity values ('a4bc94ed-8313-40aa-9a0b-17cddb3660bf','29c36b89-7ede-45bd-b47c-e75171a6edf7');
insert into movie_entity_actors_actor_entity values ('f2603896-cbc1-4d13-b6ca-d62994cbe04a','961c027b-ccf5-4892-91b5-709f53eace25');
insert into movie_entity_actors_actor_entity values ('c1773bc7-7761-4837-b908-e91466f2bc27','da77fe11-69af-4fec-a0e0-ab7a920b1166');
insert into movie_entity_actors_actor_entity values ('018cfe8b-9ee4-4ad0-9c39-8a967c326cea','f1311c57-edf1-4996-bd94-c159c00630f0');
insert into movie_entity_actors_actor_entity values ('e4abe670-32cd-4df4-b6bb-533e8176d49d','e0b4aa7f-566f-4cfa-a001-9b8ce4b42b37');
insert into movie_entity_actors_actor_entity values ('7ac77f45-72fe-4357-a050-7b55c6916d15','be6b7e71-bfac-4d84-ac3c-b31d1ede8599');
insert into movie_entity_actors_actor_entity values ('0fa9ad25-b16c-4c8f-8fa1-06e84a24038c','9553b937-d7bb-417a-bfb5-5b19d86e1542');
insert into movie_entity_actors_actor_entity values ('29e43e18-496f-4866-bd90-29ee8e6e104a','bb130121-9698-4da2-993b-9675f1219b23');
insert into movie_entity_actors_actor_entity values ('5f6c92d4-81b4-4bee-b1c9-8af5247f7378','67031872-18c8-4bb3-b0f8-ea86a808a47d');
insert into movie_entity_actors_actor_entity values ('39662695-3e5c-47dd-aebd-9a99b6e209b7','a9793810-8caf-4f54-a7db-3b577643cb3e');
insert into movie_entity_actors_actor_entity values ('5e078110-753d-4552-bcc8-9edbd7ca2465','7d8b0286-42fb-41df-8040-f58137a93aeb');
insert into movie_entity_actors_actor_entity values ('8f998474-56b9-418a-948f-1f1c5daf4d2b','3c73f530-c8cf-4605-bb88-a1c272eb48d0');
insert into movie_entity_actors_actor_entity values ('7ae1b597-6628-417d-ad93-59e2687d9c19','b95eae3a-1709-419f-97e1-f29f2b3279ba');
insert into movie_entity_actors_actor_entity values ('197fe9ba-1c9d-4885-b780-0f03a174e404','7f56afbd-ddc5-42ae-870f-8936271c2073');
insert into movie_entity_actors_actor_entity values ('8e1e4be2-d355-47c3-8fc4-b45c2705997f','6f565152-9ece-4865-8b10-ed3084b5e0cd');
insert into movie_entity_actors_actor_entity values ('02733a0d-d644-46dc-87fc-69bb6683ae4e','1e99a6db-1b48-4ddf-89c4-a4b9833665da');
insert into movie_entity_actors_actor_entity values ('87fddbd4-f72d-462f-8baa-01ccf241160d','2a0891de-608c-4f16-a740-f3122ed31e45');
insert into movie_entity_actors_actor_entity values ('6ce930f5-bc97-429e-8753-82bc50d56720','6565c9ed-3a96-4b1a-bae7-fd9871cce289');
insert into movie_entity_actors_actor_entity values ('39186fb0-0400-4dde-98ce-43d1fc4d9d7c','f080bda2-9fc8-49cc-bff4-2e8e8fbc40ef');
insert into movie_entity_actors_actor_entity values ('98d8b35d-1b5f-439e-8dcc-8973b3ff9170','f885c7c7-2d71-44dd-aa1c-8ec3e8debed3');
insert into movie_entity_actors_actor_entity values ('ff7a05b2-1486-4bc5-afc8-1196993cf4c4','a7f9b826-ebe3-4530-8c58-61d510930fdd');
insert into movie_entity_actors_actor_entity values ('c028ca08-add0-404d-a672-b77065f53469','d55890bf-f707-40fc-aa7b-98d5274a1567');
insert into movie_entity_actors_actor_entity values ('50493a28-a5d4-4610-807e-eac9abd62de1','4fcdeb0e-f70c-423f-850b-913caa3b45c6');
insert into movie_entity_actors_actor_entity values ('4cada5a2-e7ff-4856-a784-6838acefa434','4b587c54-bdfc-421c-a0d3-c64ba1ecb238');
insert into movie_entity_actors_actor_entity values ('3379eeef-475e-40c6-9d64-b838b346b133','3a4ed199-0a9a-4488-84ad-be46ba36fbba');
insert into movie_entity_actors_actor_entity values ('4a5cd227-4ce3-4942-9cf3-6296c53e7948','9c61debe-69ad-4af2-8e28-ba9ad2566c6d');
insert into movie_entity_actors_actor_entity values ('c4019bf8-5672-4f79-8fbe-fa5298f0c59c','0be365d3-427b-4246-822a-294d7a55cf69');
insert into movie_entity_actors_actor_entity values ('4c00b960-8c05-48ef-90db-7565c01db3c1','bbf3a11b-b9a8-4890-93bc-4ad92bbe5ea9');
insert into movie_entity_actors_actor_entity values ('0c345602-453e-49ae-9218-7d8370107e50','40be5aa9-ca5b-4e8d-9332-390f9c156449');

--Platform Movie

insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','74d10db7-03b8-4050-a663-11814f611e52');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','06393d9b-e85d-44e7-94e4-90e6804e0336');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','48fe667d-1c84-438d-9f2d-e6fd18a1f3fe');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','156c889c-4012-487a-aada-4d255b000d7d');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','2a8c7ed1-3b2e-4fd5-a56d-cfb1eb41226a');
insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','f0dcd0f0-c7dd-49b6-ba8c-971212a3e933');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','792a70c1-1df6-4488-a8f3-a25ded9252df');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','cba729b6-12c4-42fe-a604-caf51023371a');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','00973c26-0b8b-4697-b9f6-fe2157ee926a');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','f0102804-a7cc-4a3a-a71f-ec2a5be09dd0');
insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','9b52751c-ae9b-4071-9866-44df4f820718');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','01d09146-57c7-480a-8826-996334aec868');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','7e7b0b81-bd38-43cd-b10d-4981c49ad02a');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','16ac6176-e5a7-4e5d-b1f7-e53134c67e16');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','f173d56b-8ed5-4c0c-a92e-ba48a20a8671');
insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','cbf725ba-584f-41db-85dc-39db39d99997');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','49667dbf-49fb-4587-afb4-0f50f8d43f34');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','9cdffeee-1ab8-41ec-929a-73cd3629d13e');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','7d9f283f-b32e-47d1-b935-b0390113e141');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','06e6557c-434e-4345-8a2c-85f9c7a4089c');
insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','b4a59812-602a-4b9c-ab3f-07bb87a0ec60');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','ed20c4bf-95ec-4f0a-9ad6-4bd81343d6ea');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','1bf0494d-f3b5-4f89-ae19-9b146c7072e8');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','47f05ad0-1ece-4039-b18a-f49c95bc3c14');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','221a8c1a-32fd-4262-bed9-2808b2e2c74e');
insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','197d99f2-e9c7-434d-abe3-ed0bb3ce76e3');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','629da8ca-19a2-426d-8124-0f1d78bc9e80');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','1199a6f0-6bd3-4fb2-a270-6f2655538370');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','e33e30cc-48b4-4602-ae1d-9d3e3a0c17ef');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','b63d0f7b-05e1-47c6-b575-b88324f002f4');
insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','67222a1b-13c5-49a0-ad37-d1de35a98d60');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','aefc4141-dc3a-443c-8d12-f79a7e13d849');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','d7084c2f-d3b6-44e6-b4e0-e78c43261fa6');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','2c30ce34-ccd6-4ba0-8ced-7e96432187ba');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','0b7310f9-166d-4516-bff8-204eda6e2bfc');
insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','6aeb8e33-b546-4649-ae03-351386087784');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','e2bf9f78-afa6-4b77-93c5-8d1f26777cfa');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','59702bf8-d08b-40a5-89ad-5b6415d999f0');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','c9c4e857-6c8a-4243-a05d-1d08f78a44be');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','2abf5157-772f-4c74-97d1-ca583e96a22c');
insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','2877e5fb-c53b-4b96-a0d3-27066efa2844');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','33b3feae-8d36-4b60-9260-3cad44d71d5b');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','ff9cebd7-a020-4ed8-b8e9-32e85d3e2928');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','bed56c29-ac83-4c55-aeab-e892fa53fd99');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','afefa090-7280-4be1-a57d-d76061de55be');
insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','fee8ca0c-1db4-4a1e-963f-27df095109da');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','b80c6152-538a-4563-a420-a8af8448d657');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','22efc678-0fc9-4a46-9870-c689d28af8b9');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','d5e91ba7-70b8-4a55-90b4-a635fe06a08f');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','a60474ab-ad4e-4d20-8f44-2fc41b210bc8');
insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','781e2e11-13ad-4c6d-ad86-fd12657d986a');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','60f2b62a-0a02-4e79-837c-57dc8a3d9dad');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','5320fd0e-bdc7-4edf-ba2e-1f9cede6b9ef');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','79f5becd-994a-4e0c-91bf-f0819dfd148f');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','22e3693c-582f-4940-8f91-8487d521a4d7');
insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','2940000f-befa-4c84-b459-242e11f62425');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','28185494-5738-4f43-a809-f47d818f9b8a');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','089d4a02-3e1d-43d2-8220-5b98ac20a609');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','d47819d9-c905-461d-9bef-5dbef556ef4a');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','7335d61c-72d5-4a4c-a75d-8e08627ab399');
insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','da118d8b-ddc8-4a51-9f05-a39ef75da972');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','5383e98c-c85a-46a1-b81d-1961fdd761b2');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','a2483898-2565-48b8-a0cc-e40acd0e085e');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','76106937-b483-47d7-adb9-37752dab8b52');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','4a554aa4-56ac-4b20-8bcb-113d38cbb26b');
insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','fecb51ab-dd53-46f2-9cdc-9459ebc82772');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','315be6e6-c7df-47c6-9d60-fdab555b2e55');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','75e292b4-0668-4ee1-845b-e85c814b53a8');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','9b150dff-9abf-4e32-b177-b93ccef26882');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','f0563e58-38eb-4324-ac29-458eefe98a49');
insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','cdd75323-3247-4cbf-a6d9-34f07a9ed8de');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','a4bc94ed-8313-40aa-9a0b-17cddb3660bf');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','f2603896-cbc1-4d13-b6ca-d62994cbe04a');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','c1773bc7-7761-4837-b908-e91466f2bc27');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','018cfe8b-9ee4-4ad0-9c39-8a967c326cea');
insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','e4abe670-32cd-4df4-b6bb-533e8176d49d');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','7ac77f45-72fe-4357-a050-7b55c6916d15');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','0fa9ad25-b16c-4c8f-8fa1-06e84a24038c');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','29e43e18-496f-4866-bd90-29ee8e6e104a');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','5f6c92d4-81b4-4bee-b1c9-8af5247f7378');
insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','39662695-3e5c-47dd-aebd-9a99b6e209b7');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','5e078110-753d-4552-bcc8-9edbd7ca2465');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','8f998474-56b9-418a-948f-1f1c5daf4d2b');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','7ae1b597-6628-417d-ad93-59e2687d9c19');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','197fe9ba-1c9d-4885-b780-0f03a174e404');
insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','8e1e4be2-d355-47c3-8fc4-b45c2705997f');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','02733a0d-d644-46dc-87fc-69bb6683ae4e');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','87fddbd4-f72d-462f-8baa-01ccf241160d');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','6ce930f5-bc97-429e-8753-82bc50d56720');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','39186fb0-0400-4dde-98ce-43d1fc4d9d7c');
insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','98d8b35d-1b5f-439e-8dcc-8973b3ff9170');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','ff7a05b2-1486-4bc5-afc8-1196993cf4c4');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','c028ca08-add0-404d-a672-b77065f53469');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','50493a28-a5d4-4610-807e-eac9abd62de1');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','4cada5a2-e7ff-4856-a784-6838acefa434');
insert into platform_entity_movies_movie_entity values ('e163fb4b-1d8f-4243-b6f0-e1aab5c16613','3379eeef-475e-40c6-9d64-b838b346b133');
insert into platform_entity_movies_movie_entity values ('b83d2206-d9da-4612-b8fe-e26dd605b999','4a5cd227-4ce3-4942-9cf3-6296c53e7948');
insert into platform_entity_movies_movie_entity values ('a88e394f-fa04-4502-98bb-b6b511bf75ef','c4019bf8-5672-4f79-8fbe-fa5298f0c59c');
insert into platform_entity_movies_movie_entity values ('d3bcd8d7-981a-4fc7-8a5c-b33fe55933d3','4c00b960-8c05-48ef-90db-7565c01db3c1');
insert into platform_entity_movies_movie_entity values ('f59384e2-bec8-4113-8eb2-c41a67289c04','0c345602-453e-49ae-9218-7d8370107e50');

--Review

insert into review_entity (id, text, score, creator, "movieId") values ('76c72828-ad0f-4e2a-acb2-0adc27da969e', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst.', 2, 'Ginny Bellin', '74d10db7-03b8-4050-a663-11814f611e52');
insert into review_entity (id, text, score, creator, "movieId") values ('33d72b63-3baa-430c-a54e-30af6be615f5', 'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus.', 4, 'Sibel Gooly', '06393d9b-e85d-44e7-94e4-90e6804e0336');
insert into review_entity (id, text, score, creator, "movieId") values ('b4e88581-8960-49c2-9148-017a0af561d0', 'Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 5, 'Dennie De Avenell', '48fe667d-1c84-438d-9f2d-e6fd18a1f3fe');
insert into review_entity (id, text, score, creator, "movieId") values ('9359eec5-f21b-4154-a749-bd5355eae248', 'Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius.', 3, 'Galvan Ebrall', '156c889c-4012-487a-aada-4d255b000d7d');
insert into review_entity (id, text, score, creator, "movieId") values ('3361333a-6137-4704-906b-dafc1ab816a5', 'Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 4, 'Persis Yandle', '2a8c7ed1-3b2e-4fd5-a56d-cfb1eb41226a');
insert into review_entity (id, text, score, creator, "movieId") values ('4b20c7c0-3dc5-44e6-9308-f65fd9830a99', 'Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam.', 4, 'Matt Danslow', 'f0dcd0f0-c7dd-49b6-ba8c-971212a3e933');
insert into review_entity (id, text, score, creator, "movieId") values ('783c445a-5383-48c5-962e-135bcb06f110', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.', 1, 'Werner Barrack', '792a70c1-1df6-4488-a8f3-a25ded9252df');
insert into review_entity (id, text, score, creator, "movieId") values ('a248d334-bc67-4643-8af3-dde92e16b2d5', 'Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien.', 2, 'Dallas Shipston', 'cba729b6-12c4-42fe-a604-caf51023371a');
insert into review_entity (id, text, score, creator, "movieId") values ('0531b037-6111-403a-a7b9-4be791ad7497', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.', 3, 'Kristos Creasey', '00973c26-0b8b-4697-b9f6-fe2157ee926a');
insert into review_entity (id, text, score, creator, "movieId") values ('d9837763-9eac-4b6b-94ac-63af99ed3ae1', 'Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.', 2, 'Johna Calleja', 'f0102804-a7cc-4a3a-a71f-ec2a5be09dd0');
insert into review_entity (id, text, score, creator, "movieId") values ('9e3c53f8-47d8-40d9-8898-218a3971db57', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.', 2, 'Carlina Plevin', '9b52751c-ae9b-4071-9866-44df4f820718');
insert into review_entity (id, text, score, creator, "movieId") values ('65ddf626-0731-4899-9966-c8d3ae22ffb8', 'Aliquam non mauris. Morbi non lectus.', 4, 'Mariana Garland', '01d09146-57c7-480a-8826-996334aec868');
insert into review_entity (id, text, score, creator, "movieId") values ('c98e1b1f-ddd9-4060-8a82-aaff397981fd', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', 1, 'Francesca Glowach', '7e7b0b81-bd38-43cd-b10d-4981c49ad02a');
insert into review_entity (id, text, score, creator, "movieId") values ('d28eebfe-5301-4f16-b24e-14b025e2553d', 'Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.', 1, 'Kylila Bowskill', '16ac6176-e5a7-4e5d-b1f7-e53134c67e16');
insert into review_entity (id, text, score, creator, "movieId") values ('96653dc9-ce7f-4e0c-ad10-2f3e5e01e860', 'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 3, 'Bartie Baggallay', 'f173d56b-8ed5-4c0c-a92e-ba48a20a8671');
insert into review_entity (id, text, score, creator, "movieId") values ('8f9d19d8-df90-4a66-8d4e-116e86efead0', 'Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.', 3, 'Leonid Johnes', 'cbf725ba-584f-41db-85dc-39db39d99997');
insert into review_entity (id, text, score, creator, "movieId") values ('e3beeb67-3ba7-4cd5-867d-5c48aa2c5f7c', 'Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 4, 'Bobbette Creboe', '49667dbf-49fb-4587-afb4-0f50f8d43f34');
insert into review_entity (id, text, score, creator, "movieId") values ('5340247f-7d8c-4d4b-a79f-3cd2eb929118', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.', 3, 'Tomas Stubbins', '9cdffeee-1ab8-41ec-929a-73cd3629d13e');
insert into review_entity (id, text, score, creator, "movieId") values ('2fd97dd3-428a-415d-966e-e84f4ad20b38', 'Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 3, 'Tybi O''Neary', '7d9f283f-b32e-47d1-b935-b0390113e141');
insert into review_entity (id, text, score, creator, "movieId") values ('8fd0d5a3-3004-4ede-8d4c-07cc8d521c02', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.', 2, 'Wolfie McDonogh', '06e6557c-434e-4345-8a2c-85f9c7a4089c');
insert into review_entity (id, text, score, creator, "movieId") values ('06eab25c-007d-4997-925c-b03a4027b21d', 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 2, 'Bethanne Spurett', 'b4a59812-602a-4b9c-ab3f-07bb87a0ec60');
insert into review_entity (id, text, score, creator, "movieId") values ('0491ec46-4070-4875-9be6-2e888cab4f1e', 'Etiam justo.', 3, 'Dar Dundon', 'ed20c4bf-95ec-4f0a-9ad6-4bd81343d6ea');
insert into review_entity (id, text, score, creator, "movieId") values ('e6b89bd2-f1a9-4db0-95de-a4f62c67b95a', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 4, 'Thayne Girke', '1bf0494d-f3b5-4f89-ae19-9b146c7072e8');
insert into review_entity (id, text, score, creator, "movieId") values ('3aacd1bc-3c81-4497-a8db-e2b51ab1ab2f', 'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 5, 'Morgan Bunton', '47f05ad0-1ece-4039-b18a-f49c95bc3c14');
insert into review_entity (id, text, score, creator, "movieId") values ('bd66db43-3c8d-4534-9418-54fa046e5dee', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 2, 'Bentley Muscat', '221a8c1a-32fd-4262-bed9-2808b2e2c74e');
insert into review_entity (id, text, score, creator, "movieId") values ('d976a184-34c5-4f79-a43f-72edded393c1', 'Aliquam erat volutpat. In congue.', 4, 'Myrtia Lethbridge', '197d99f2-e9c7-434d-abe3-ed0bb3ce76e3');
insert into review_entity (id, text, score, creator, "movieId") values ('45149e72-e5c9-42a4-b0d7-58efbc9347f0', 'Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 4, 'Marie Braunes', '629da8ca-19a2-426d-8124-0f1d78bc9e80');
insert into review_entity (id, text, score, creator, "movieId") values ('ba87ea19-f6e6-4350-943c-5edd7bd890d8', 'Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 1, 'Hew Moye', '1199a6f0-6bd3-4fb2-a270-6f2655538370');
insert into review_entity (id, text, score, creator, "movieId") values ('83a7a8df-e989-4277-b75b-e30bcfd757bc', 'Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus.', 3, 'Carmelia Langtry', 'e33e30cc-48b4-4602-ae1d-9d3e3a0c17ef');
insert into review_entity (id, text, score, creator, "movieId") values ('fd0f3d71-ab30-419e-8da9-35bc1bde2354', 'Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.', 2, 'Rosalia Rosenwasser', 'b63d0f7b-05e1-47c6-b575-b88324f002f4');
insert into review_entity (id, text, score, creator, "movieId") values ('dd2fb5c4-1630-4238-b87b-6511a0536528', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 4, 'Erin Nitti', '67222a1b-13c5-49a0-ad37-d1de35a98d60');
insert into review_entity (id, text, score, creator, "movieId") values ('7e2130e8-7c08-4afb-a95c-3b125923c07c', 'Praesent blandit lacinia erat.', 3, 'Kerstin Budgett', 'aefc4141-dc3a-443c-8d12-f79a7e13d849');
insert into review_entity (id, text, score, creator, "movieId") values ('8f44c8eb-2724-49e3-a355-c0c59fbf35d9', 'Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.', 1, 'Sydney Moyles', 'd7084c2f-d3b6-44e6-b4e0-e78c43261fa6');
insert into review_entity (id, text, score, creator, "movieId") values ('8f660a75-e301-4a18-8d6b-dd700b9d7c15', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.', 3, 'Devina Brogi', '2c30ce34-ccd6-4ba0-8ced-7e96432187ba');
insert into review_entity (id, text, score, creator, "movieId") values ('73dffa21-44f3-44ce-85f4-89ca11de60a0', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 3, 'Donnell Thoresbie', '0b7310f9-166d-4516-bff8-204eda6e2bfc');
insert into review_entity (id, text, score, creator, "movieId") values ('5056dc46-7bcf-4a69-858a-49077dec5a93', 'Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.', 3, 'Valry Matejka', '6aeb8e33-b546-4649-ae03-351386087784');
insert into review_entity (id, text, score, creator, "movieId") values ('6c9b4fd8-73db-4cdd-91a0-6f2cf2fc696e', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 3, 'Justino Lapping', 'e2bf9f78-afa6-4b77-93c5-8d1f26777cfa');
insert into review_entity (id, text, score, creator, "movieId") values ('2268aa2c-b8ed-49ef-9de1-073d5015e24b', 'Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.', 4, 'Merell Greenland', '59702bf8-d08b-40a5-89ad-5b6415d999f0');
insert into review_entity (id, text, score, creator, "movieId") values ('5a583a69-0b8b-47ea-bcae-bc92177b40c5', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.', 3, 'Lynett Songest', 'c9c4e857-6c8a-4243-a05d-1d08f78a44be');
insert into review_entity (id, text, score, creator, "movieId") values ('b0d02375-6072-44db-9904-5df7b92e8eb8', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.', 2, 'Renaud McKellen', '2abf5157-772f-4c74-97d1-ca583e96a22c');
insert into review_entity (id, text, score, creator, "movieId") values ('77fda8ba-ce8b-4ba8-bdbd-96a96da22b0b', 'Vivamus in felis eu sapien cursus vestibulum. Proin eu mi.', 3, 'Dwight Celloni', '2877e5fb-c53b-4b96-a0d3-27066efa2844');
insert into review_entity (id, text, score, creator, "movieId") values ('efc7e518-fedb-4d7e-af62-5141f685486d', 'Morbi porttitor lorem id ligula.', 4, 'Millard Vyvyan', '33b3feae-8d36-4b60-9260-3cad44d71d5b');
insert into review_entity (id, text, score, creator, "movieId") values ('93ba12e2-09f0-408a-8a3c-bfd6bb1d2a52', 'Aliquam sit amet diam in magna bibendum imperdiet.', 2, 'Thacher Balk', 'ff9cebd7-a020-4ed8-b8e9-32e85d3e2928');
insert into review_entity (id, text, score, creator, "movieId") values ('a9c42703-cf61-4446-a3d4-0067b7583122', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 5, 'Stephanie Brixey', 'bed56c29-ac83-4c55-aeab-e892fa53fd99');
insert into review_entity (id, text, score, creator, "movieId") values ('ea00ec54-c50c-4762-a4cd-260c45161579', 'Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.', 5, 'Fredia Earpe', 'afefa090-7280-4be1-a57d-d76061de55be');
insert into review_entity (id, text, score, creator, "movieId") values ('12413ee7-738e-47bf-8095-752a6fa8e7f7', 'Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh.', 2, 'Ario Hawse', 'fee8ca0c-1db4-4a1e-963f-27df095109da');
insert into review_entity (id, text, score, creator, "movieId") values ('c0e79e76-394e-4fe1-9ee0-ebf1042962d3', 'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus.', 3, 'Mic Youngman', 'b80c6152-538a-4563-a420-a8af8448d657');
insert into review_entity (id, text, score, creator, "movieId") values ('43e33fd0-1e5c-41c2-bccd-f628442e77eb', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst.', 2, 'Debor Kennefick', '22efc678-0fc9-4a46-9870-c689d28af8b9');
insert into review_entity (id, text, score, creator, "movieId") values ('9a32bc36-516d-432d-8900-3e83def7cf9b', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.', 5, 'Sorcha Suerz', 'd5e91ba7-70b8-4a55-90b4-a635fe06a08f');
insert into review_entity (id, text, score, creator, "movieId") values ('89a32559-329e-4191-8315-51dbd14023d5', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.', 5, 'Zea Di Domenico', 'a60474ab-ad4e-4d20-8f44-2fc41b210bc8');
insert into review_entity (id, text, score, creator, "movieId") values ('b7dcbd62-e5f6-4cd8-8a39-5edcc7d75ceb', 'Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.', 5, 'Elsy Powdrill', '781e2e11-13ad-4c6d-ad86-fd12657d986a');
insert into review_entity (id, text, score, creator, "movieId") values ('b6601ef9-f2eb-4e2e-9ddb-70ecd3156d2a', 'Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus.', 3, 'Kaitlynn Mirams', '60f2b62a-0a02-4e79-837c-57dc8a3d9dad');
insert into review_entity (id, text, score, creator, "movieId") values ('12179afe-b55f-42a0-a679-2f8f556475cb', 'Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.', 4, 'Avril Souttar', '5320fd0e-bdc7-4edf-ba2e-1f9cede6b9ef');
insert into review_entity (id, text, score, creator, "movieId") values ('47ff104d-cc82-45d2-86be-1d8052c07fef', 'Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 1, 'Mallory Petruk', '79f5becd-994a-4e0c-91bf-f0819dfd148f');
insert into review_entity (id, text, score, creator, "movieId") values ('21b90a18-3133-4eb7-befe-1dfd4ab053a3', 'Etiam pretium iaculis justo.', 1, 'Smitty Coumbe', '22e3693c-582f-4940-8f91-8487d521a4d7');
insert into review_entity (id, text, score, creator, "movieId") values ('f9d04832-55a5-4e39-bab1-4616358c6e8b', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh.', 4, 'Whitney Passingham', '2940000f-befa-4c84-b459-242e11f62425');
insert into review_entity (id, text, score, creator, "movieId") values ('8587f354-26a1-40d0-ade0-7d0f42c5c7b8', 'Nulla suscipit ligula in lacus.', 2, 'Willamina Humbell', '28185494-5738-4f43-a809-f47d818f9b8a');
insert into review_entity (id, text, score, creator, "movieId") values ('275ac96b-72b0-43b0-9fad-3b7dda5d49e7', 'Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus.', 4, 'Theo Blasius', '089d4a02-3e1d-43d2-8220-5b98ac20a609');
insert into review_entity (id, text, score, creator, "movieId") values ('7094776b-dd23-4586-a350-1a5892c6d6fd', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', 1, 'Tomasine Ritchman', 'd47819d9-c905-461d-9bef-5dbef556ef4a');
insert into review_entity (id, text, score, creator, "movieId") values ('fad344c0-91e3-4f00-95c3-247780419524', 'In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.', 3, 'Thurstan Reijmers', '7335d61c-72d5-4a4c-a75d-8e08627ab399');
insert into review_entity (id, text, score, creator, "movieId") values ('b72ad69a-8958-4a1c-9696-5428a55d4cce', 'Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 5, 'Willi Mulcock', 'da118d8b-ddc8-4a51-9f05-a39ef75da972');
insert into review_entity (id, text, score, creator, "movieId") values ('5edb35e7-688b-4c64-94af-b74a01ac70c8', 'Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor.', 1, 'Ardelis Heersma', '5383e98c-c85a-46a1-b81d-1961fdd761b2');
insert into review_entity (id, text, score, creator, "movieId") values ('a6497dc4-4488-4fb3-9e95-2b5e867aa4dc', 'In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 2, 'Billie Fray', 'a2483898-2565-48b8-a0cc-e40acd0e085e');
insert into review_entity (id, text, score, creator, "movieId") values ('f74a9579-265a-4b45-bb04-3f509cc47fc0', 'Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.', 3, 'Sile Andras', '76106937-b483-47d7-adb9-37752dab8b52');
insert into review_entity (id, text, score, creator, "movieId") values ('46bd5db6-623b-47a3-a066-ae35e3deb417', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus.', 4, 'Yule Randell', '4a554aa4-56ac-4b20-8bcb-113d38cbb26b');
insert into review_entity (id, text, score, creator, "movieId") values ('4f5059c5-37e2-4dc0-9911-4aa7b9819ac3', 'In sagittis dui vel nisl. Duis ac nibh.', 4, 'Sandie Bloore', 'fecb51ab-dd53-46f2-9cdc-9459ebc82772');
insert into review_entity (id, text, score, creator, "movieId") values ('c11df3ba-ee15-42fa-ad59-cf06410d8984', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 4, 'Adham Lofting', '315be6e6-c7df-47c6-9d60-fdab555b2e55');
insert into review_entity (id, text, score, creator, "movieId") values ('aca0e705-71e4-4d81-9b00-ec3cae1286df', 'Nulla nisl.', 3, 'Vic Connor', '75e292b4-0668-4ee1-845b-e85c814b53a8');
insert into review_entity (id, text, score, creator, "movieId") values ('2c2c9e91-44c7-4020-93a9-726dd39b3c3b', 'In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.', 4, 'Neall Lovatt', '9b150dff-9abf-4e32-b177-b93ccef26882');
insert into review_entity (id, text, score, creator, "movieId") values ('62aa87a9-08c8-4a99-8b78-1272172f2caa', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.', 5, 'Sibyl Cruxton', 'f0563e58-38eb-4324-ac29-458eefe98a49');
insert into review_entity (id, text, score, creator, "movieId") values ('839d8d0f-ada9-4410-a9a5-e11cb7887d81', 'Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi.', 1, 'Tiffani Bohills', 'cdd75323-3247-4cbf-a6d9-34f07a9ed8de');
insert into review_entity (id, text, score, creator, "movieId") values ('7de958c6-d12c-4596-9e43-5c2a5f0efb45', 'Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 5, 'Jeramie McAw', 'a4bc94ed-8313-40aa-9a0b-17cddb3660bf');
insert into review_entity (id, text, score, creator, "movieId") values ('da262a9d-dddb-41e3-846b-75f0a849abdd', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo.', 4, 'Putnam Gilhespy', 'f2603896-cbc1-4d13-b6ca-d62994cbe04a');
insert into review_entity (id, text, score, creator, "movieId") values ('9861f4bb-a103-41f8-8d4a-f63a558562c9', 'Nulla mollis molestie lorem. Quisque ut erat.', 4, 'Hall Earley', 'c1773bc7-7761-4837-b908-e91466f2bc27');
insert into review_entity (id, text, score, creator, "movieId") values ('cfdfa7c3-febb-4737-bfea-16b53c355406', 'Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.', 2, 'Carey Carcass', '018cfe8b-9ee4-4ad0-9c39-8a967c326cea');
insert into review_entity (id, text, score, creator, "movieId") values ('67d6aead-c51e-47de-83e2-357163d6caed', 'Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio.', 1, 'Kasey Traher', 'e4abe670-32cd-4df4-b6bb-533e8176d49d');
insert into review_entity (id, text, score, creator, "movieId") values ('2f5700a3-623d-448d-a528-1d20df2792ed', 'Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo.', 4, 'Hettie Shinefield', '7ac77f45-72fe-4357-a050-7b55c6916d15');
insert into review_entity (id, text, score, creator, "movieId") values ('8684e8ee-db67-43b0-8e9b-ecb11c67d4b3', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 3, 'Juan Colebourne', '0fa9ad25-b16c-4c8f-8fa1-06e84a24038c');
insert into review_entity (id, text, score, creator, "movieId") values ('62d5d1eb-541b-4045-840e-1b9c2dfc47e1', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.', 1, 'Binnie Pautot', '29e43e18-496f-4866-bd90-29ee8e6e104a');
insert into review_entity (id, text, score, creator, "movieId") values ('7d20ebad-91de-45cd-8e20-e6eb508b5a05', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla.', 1, 'Mile Dounbare', '5f6c92d4-81b4-4bee-b1c9-8af5247f7378');
insert into review_entity (id, text, score, creator, "movieId") values ('2f53a7dc-1ffa-4aab-97fa-a5aae9dac0c4', 'Etiam vel augue. Vestibulum rutrum rutrum neque.', 3, 'Dodie De Blasio', '39662695-3e5c-47dd-aebd-9a99b6e209b7');
insert into review_entity (id, text, score, creator, "movieId") values ('863b6f0c-6be6-4874-b58e-bd28aa1a1c7a', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.', 4, 'Crista Hopkyns', '5e078110-753d-4552-bcc8-9edbd7ca2465');
insert into review_entity (id, text, score, creator, "movieId") values ('804ebc49-c672-4d29-8741-594f264193bf', 'In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 1, 'Ellerey Lenz', '8f998474-56b9-418a-948f-1f1c5daf4d2b');
insert into review_entity (id, text, score, creator, "movieId") values ('78fd6566-6c3f-4ad2-956a-b8037bdbfeba', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor.', 5, 'Leilah Ramsay', '7ae1b597-6628-417d-ad93-59e2687d9c19');
insert into review_entity (id, text, score, creator, "movieId") values ('1cdc028e-b0db-4348-8835-536f9f5927f0', 'Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor.', 2, 'Artie Sheilds', '197fe9ba-1c9d-4885-b780-0f03a174e404');
insert into review_entity (id, text, score, creator, "movieId") values ('1d84241c-0666-4798-9002-143defa9d383', 'Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 3, 'Wilone Grube', '8e1e4be2-d355-47c3-8fc4-b45c2705997f');
insert into review_entity (id, text, score, creator, "movieId") values ('90a1a927-f470-40ea-8449-77340f79c153', 'Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 4, 'Basilius Gave', '02733a0d-d644-46dc-87fc-69bb6683ae4e');
insert into review_entity (id, text, score, creator, "movieId") values ('62bc7306-fdd7-4fc8-94ec-4ed47a44d42e', 'Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst.', 5, 'Kat Popland', '87fddbd4-f72d-462f-8baa-01ccf241160d');
insert into review_entity (id, text, score, creator, "movieId") values ('d43d6798-b60a-40c8-843d-78d1043d2ce4', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 5, 'Halie Attersoll', '6ce930f5-bc97-429e-8753-82bc50d56720');
insert into review_entity (id, text, score, creator, "movieId") values ('0fd64a14-a380-4ec2-a730-d9b2acd69fbd', 'Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 1, 'Brigit Pithie', '39186fb0-0400-4dde-98ce-43d1fc4d9d7c');
insert into review_entity (id, text, score, creator, "movieId") values ('8baadd71-1eee-4568-badc-6fc6298acb6a', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 4, 'Guenna Cloutt', '98d8b35d-1b5f-439e-8dcc-8973b3ff9170');
insert into review_entity (id, text, score, creator, "movieId") values ('27b04e82-bd5d-4242-9fa6-e4b17751a82e', 'Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam.', 1, 'Fanchette Sympson', 'ff7a05b2-1486-4bc5-afc8-1196993cf4c4');
insert into review_entity (id, text, score, creator, "movieId") values ('75d0fc4d-8131-4764-99b7-a68788b875ed', 'Nam dui.', 5, 'Allison Laurand', 'c028ca08-add0-404d-a672-b77065f53469');
insert into review_entity (id, text, score, creator, "movieId") values ('ba184b96-5ec1-4a73-87e5-bcd18a3cebdd', 'In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 3, 'Bone Dufaur', '50493a28-a5d4-4610-807e-eac9abd62de1');
insert into review_entity (id, text, score, creator, "movieId") values ('4cf3efba-8e0a-4355-a403-35ccd91b0510', 'Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 3, 'Ted Lindsay', '4cada5a2-e7ff-4856-a784-6838acefa434');
insert into review_entity (id, text, score, creator, "movieId") values ('e76a71df-5b50-4c7c-bc8a-035a85daa50f', 'Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus.', 1, 'Dorie Healing', '3379eeef-475e-40c6-9d64-b838b346b133');
insert into review_entity (id, text, score, creator, "movieId") values ('bff805ba-f4f6-45c7-8e69-dc6133a47828', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.', 3, 'Kalli Turban', '4a5cd227-4ce3-4942-9cf3-6296c53e7948');
insert into review_entity (id, text, score, creator, "movieId") values ('3785ecb2-fa13-49e1-b822-1018dbf98cb2', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.', 2, 'Kary Zannelli', 'c4019bf8-5672-4f79-8fbe-fa5298f0c59c');
insert into review_entity (id, text, score, creator, "movieId") values ('d1435738-80e5-45c0-819d-e74ee9134ece', 'Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis.', 1, 'Astra Weeke', '4c00b960-8c05-48ef-90db-7565c01db3c1');
insert into review_entity (id, text, score, creator, "movieId") values ('e5991137-1788-4572-ad68-9ea1992a0cda', 'Nullam porttitor lacus at turpis.', 3, 'Roxane Thonger', '0c345602-453e-49ae-9218-7d8370107e50');

--Update poster

update movie_entity set poster = 'http://dummyimage.com/107x100.png/ff4444/ffffff';

`;