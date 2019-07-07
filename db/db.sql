CREATE TABLE placesofinterest (
id SERIAL PRIMARY KEY,
placeofinterestname VARCHAR(100) NOT NULL,
placeofinterestdescription VARCHAR(355) NOT NULL,
locationname VARCHAR(100) NOT NULL,
locationid INT NOT NULL REFERENCES locations (id),
priceforvisit VARCHAR(150) NOT NULL,
locationmap VARCHAR(150) NOT NULL,
openhours VARCHAR(150) NOT NULL,
phonenumber VARCHAR(150) NOT NULL,
website VARCHAR(150) NOT NULL
);

CREATE TABLE locations (
id SERIAL PRIMARY KEY,
locationname VARCHAR(100) NOT NULL,
population INT NOT NULL
);

CREATE TABLE contacts (
id SERIAL PRIMARY KEY,
contactname VARCHAR(100) NOT NULL,
contactemail VARCHAR(100) NOT NULL,
message VARCHAR(700) NOT NULL
);

INSERT INTO contacts (contactname, contactemail, message) VALUES ('Kiev', 2900000);


INSERT INTO locations (locationname, population) VALUES ('Kiev', 2900000);

DROP TABLE placesofinterest;

INSERT INTO placesofinterest (placeofinterestname, placeofinterestdescription, locationname, locationid, priceforvisit, locationmap, openhours, phonenumber, website) VALUES ('Kiev Pechersk Lavra', 'Kiev Pechersk Lavra, also known as the Kiev Monastery of the Caves, is a historic Orthodox Christian monastery. Since its foundation as the cave monastery in 1051 the Lavra has been a preeminent center of Eastern Orthodox Christianity in Eastern Europe. Together with the Saint Sophia Cathedral, it is inscribed as a UNESCO World Heritage Site.', 'Kiev', 1, 'part of Lavra is free for access, another part of Lavra is accessble only for a payment in the amount of ', 'https://www.kplavra.kiev.ua/en/locationmap', 'daily from 9:00 am to 7:00 pm', 'Tours Desk: +38 (044) 406 63 75', 'https://www.kplavra.kiev.ua/en');
INSERT INTO placesofinterest (placeofinterestname, placeofinterestdescription, locationname, locationid, priceforvisit, locationmap, openhours, phonenumber, website) VALUES ('Saint Sophia Cathedral', 'An outstanding architectural monument of Kievan Rus. The cathedral is one of the best known landmarks of the city and the first heritage site in Ukraine to be inscribed on the World Heritage List along with the Kiev Cave Monastery complex. The first foundations were laid in 1037 or 1011, but the cathedral took two decades to complete.', 'Kiev', 1, 'https://st-sophia.org.ua/en/news/tickets-prices/', 'locationmap', 'Opening Hours: 10:00 - 18:00, Saturday: 10:00 - 17:00 Closed on Thursday', '+38 (044)278-26-20', 'https://st-sophia.org.ua/en/home/');
INSERT INTO placesofinterest (placeofinterestname, placeofinterestdescription, locationname, locationid, priceforvisit, locationmap, openhours, phonenumber, website, image) VALUES ('Khortytsya National Park', 'The major part of the reserve (historic park) covers the Zaporizhian Cossack Museum that includes the Cossack horse show. The museum building is modern, nestling low in the landscape with dramatic views of the Dnieper Hydroelectric Station to the north. The expo area of the museum was accounted for 1,600 m2 (17,000 sq ft) portraying the following themes: Khortytsia in ancient times, history of Zaporizhian Cossacks, history of Zaporizhia at times of construction of socialism. There also existed four dioramas: "Battle of Sviatoslav at rapids" (author - M.Oviechkin), "Uprising of the impoverished cossacks at Zaporizhian Sich in 1768" (M.Oviechkin), "Construction of Dnieper HES" (V.Trotsenko), "Night storm of Zaporizhia city in October 1943" (M.Oviechkin). The museum contains exhibits dating from the Stone Age through the Scythian period (c.750 - 250 BC) down to the 20th century.', 'Zaporizhia', 1, '48 UAH', 'https://en.wikipedia.org/wiki/Khortytsia', 'From 9:30 am to 16:30 pm', 'Tours Desk: +38 (096)-254-12-09, +38 (095)-914-77-06', 'https://en.wikipedia.org/wiki/Khortytsia', 'images/khortitza_sich.jpg');


ALTER TABLE placesofinterest
ADD image varchar(150);

ALTER TABLE placesofinterest
ALTER COLUMN placeofinterestdescription TYPE varchar(950);


UPDATE placesofinterest
SET image = 'images/kiev_lavra.jpg'
WHERE id = 2;

UPDATE placesofinterest
SET image = 'images/sofia-kievskaya3.jpg'
WHERE id = 3;