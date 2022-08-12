insert into PORTFOLIO (id,name) values (1,'SELFCARE');

insert into SERVICE_GROUP (id,name, PORTFOLIO_NAME) values(1,'ONLINE','SELFCARE');
insert into SERVICE_GROUP (id,name, PORTFOLIO_NAME) values(2,'IVRS','SELFCARE');

insert  into SERVICES (id,SERVICE_NAME,SERVICE_DESCRIPTION,GROUP_NAME,CODE_REPO_URL,CI_CD_PLAN_URL,OWNER) 
values (1,'slfcr-login-service','service for user login','ONLINE','https://github.com/selfcare/slfcr-login-service','https://bbroko.teamcity.com/selfcare/slfcr-login-service','selfcare team');
insert  into SERVICES (id,SERVICE_NAME,SERVICE_DESCRIPTION,GROUP_NAME,CODE_REPO_URL,CI_CD_PLAN_URL,OWNER) 
values (2,'slfcr-view-balance-service','service for view balance','ONLINE','https://github.com/selfcare/slfcr-view-balance-service','https://bbroko.teamcity.com/selfcare/slfcr-view-balance-service','selfcare team');
insert  into SERVICES (id,SERVICE_NAME,SERVICE_DESCRIPTION,GROUP_NAME,CODE_REPO_URL,CI_CD_PLAN_URL,OWNER) 
values (3,'slfcr-pay-bill-service','service for pay-bill','ONLINE','https://github.com/selfcare/slfcr-pay-bill-service','https://bbroko.teamcity.com/selfcare/slfcr-pay-bill-service','selfcare team');
insert  into SERVICES (id,SERVICE_NAME,SERVICE_DESCRIPTION,GROUP_NAME,CODE_REPO_URL,CI_CD_PLAN_URL,OWNER) 
values (4,'slfcr-topup-service','service for topup','ONLINE','https://github.com/selfcare/slfcr-buy-topup-service','https://bbroko.teamcity.com/selfcare/slfcr-buy-topup-service','selfcare team');
insert  into SERVICES (id,SERVICE_NAME,SERVICE_DESCRIPTION,GROUP_NAME,CODE_REPO_URL,CI_CD_PLAN_URL,OWNER) 
values (5,'slfcr-buy-addon-service','service for addon','ONLINE','https://github.com/selfcare/slfcr-addon-service','https://bbroko.teamcity.com/selfcare/slfcr-addon-service','selfcare team');
insert  into SERVICES (id,SERVICE_NAME,SERVICE_DESCRIPTION,GROUP_NAME,CODE_REPO_URL,CI_CD_PLAN_URL,OWNER) 
values (6,'slfcr-dispute-service','service for dispute','ONLINE','https://github.com/selfcare/slfcr-dispute-service','https://bbroko.teamcity.com/selfcare/slfcr-dispute-service','selfcare team');
insert  into SERVICES (id,SERVICE_NAME,SERVICE_DESCRIPTION,GROUP_NAME,CODE_REPO_URL,CI_CD_PLAN_URL,OWNER) 
values (7,'slfcr-view-plan-service','service for view-plan','ONLINE','https://github.com/selfcare/slfcr-view-plan-service','https://bbroko.teamcity.com/selfcare/slfcr-view-plan-service','selfcare team');
insert  into SERVICES (id,SERVICE_NAME,SERVICE_DESCRIPTION,GROUP_NAME,CODE_REPO_URL,CI_CD_PLAN_URL,OWNER) 
values (8,'slfcr-change-plan-service','service for change-plan','ONLINE','https://github.com/selfcare/slfcr-change-plan-service','https://bbroko.teamcity.com/selfcare/slfcr-change-plan-service','selfcare team');
insert  into SERVICES (id,SERVICE_NAME,SERVICE_DESCRIPTION,GROUP_NAME,CODE_REPO_URL,CI_CD_PLAN_URL,OWNER) 
values (9,'slfcr-location-service','service for location','ONLINE','https://github.com/selfcare/slfcr-location-service','https://bbroko.teamcity.com/selfcare/slfcr-location-service','selfcare team');

insert  into SERVICES (id,SERVICE_NAME,SERVICE_DESCRIPTION,GROUP_NAME,CODE_REPO_URL,CI_CD_PLAN_URL,OWNER) 
values (10,'ivrs-login-service','service for user login','IVRS','https://github.com/selfcare/ivrs-login-service','https://bbroko.teamcity.com/selfcare/ivrs-login-service','selfcare team');
insert  into SERVICES (id,SERVICE_NAME,SERVICE_DESCRIPTION,GROUP_NAME,CODE_REPO_URL,CI_CD_PLAN_URL,OWNER) 
values (11,'ivrs-view-balance-service','service for view balance','IVRS','https://github.com/selfcare/ivrs-view-balance-service','https://bbroko.teamcity.com/selfcare/ivrs-view-balance-service','selfcare team');
insert  into SERVICES (id,SERVICE_NAME,SERVICE_DESCRIPTION,GROUP_NAME,CODE_REPO_URL,CI_CD_PLAN_URL,OWNER) 
values (12,'ivrs-pay-bill-service','service for pay-bill','IVRS','https://github.com/selfcare/ivrs-pay-bill-service','https://bbroko.teamcity.com/selfcare/ivrs-pay-bill-service','selfcare team');
insert  into SERVICES (id,SERVICE_NAME,SERVICE_DESCRIPTION,GROUP_NAME,CODE_REPO_URL,CI_CD_PLAN_URL,OWNER) 
values (13,'ivrs-buy-topup-service','service for topup','IVRS','https://github.com/selfcare/ivrs-buy-topup-service','https://bbroko.teamcity.com/selfcare/ivrs-buy-topup-service','selfcare team');
insert  into SERVICES (id,SERVICE_NAME,SERVICE_DESCRIPTION,GROUP_NAME,CODE_REPO_URL,CI_CD_PLAN_URL,OWNER) 
values (14,'ivrs-addon-service','service for addon','IVRS','https://github.com/selfcare/ivrs-addon-service','https://bbroko.teamcity.com/selfcare/ivrs-addon-service','selfcare team');


INSERT INTO SERVICE_CHANGE_REQUEST
(ID,EPIC_NUMBER,FEATURE_NUMBER,STORY_DESCRIPTION,STORY_LINK,STORY_NUMBER,TARGET_RELEASE_DATE,TARGET_RELEASE_NUMBER)
VALUES (167, '8001', '5001', 'NA', 'NA', '2001','2022-08-31', '20220831');
INSERT INTO SERVICE_CHANGE_REQUEST
(ID,EPIC_NUMBER,FEATURE_NUMBER,STORY_DESCRIPTION,STORY_LINK,STORY_NUMBER,TARGET_RELEASE_DATE,TARGET_RELEASE_NUMBER)
VALUES (170, '8001', '5001', '', '', '2002','2022-08-31', '20220831');
INSERT INTO SERVICE_CHANGE_REQUEST
(ID,EPIC_NUMBER,FEATURE_NUMBER,STORY_DESCRIPTION,STORY_LINK,STORY_NUMBER,TARGET_RELEASE_DATE,TARGET_RELEASE_NUMBER)
VALUES (172, '8001', '5001', '', '', '2003','2022-08-31', '20220831'); 

INSERT INTO SERVICE_IMPACT_DETAILS
(ID,CACHE_CLEAR,CODE_CHANGE,CODE_CHANGE_COMMIT_URL,DB_CHANGE,DB_CHANGE_COMMIT_URL,IMPACTED_SERVICE_NAME,INSTALL,RESTART,STORY_NUMBER)
VALUES (168, FALSE, FALSE, '', TRUE, '', 'slfcr-login-service', FALSE, TRUE, '2001');
INSERT INTO SERVICE_IMPACT_DETAILS
(ID,CACHE_CLEAR,CODE_CHANGE,CODE_CHANGE_COMMIT_URL,DB_CHANGE,DB_CHANGE_COMMIT_URL,IMPACTED_SERVICE_NAME,INSTALL,RESTART,STORY_NUMBER)
VALUES (169, FALSE, TRUE, '', TRUE, '', 'slfcr-buy-addon-service', TRUE, FALSE, '2001');
INSERT INTO SERVICE_IMPACT_DETAILS
(ID,CACHE_CLEAR,CODE_CHANGE,CODE_CHANGE_COMMIT_URL,DB_CHANGE,DB_CHANGE_COMMIT_URL,IMPACTED_SERVICE_NAME,INSTALL,RESTART,STORY_NUMBER)
VALUES (171, TRUE, FALSE, '', TRUE, '', 'ivrs-buy-topup-service', FALSE, FALSE, '2002');
INSERT INTO SERVICE_IMPACT_DETAILS
(ID,CACHE_CLEAR,CODE_CHANGE,CODE_CHANGE_COMMIT_URL,DB_CHANGE,DB_CHANGE_COMMIT_URL,IMPACTED_SERVICE_NAME,INSTALL,RESTART,STORY_NUMBER)
VALUES (173, TRUE, FALSE, '', TRUE, '', 'slfcr-pay-bill-service', FALSE, FALSE, '2003');
INSERT INTO SERVICE_IMPACT_DETAILS
(ID,CACHE_CLEAR,CODE_CHANGE,CODE_CHANGE_COMMIT_URL,DB_CHANGE,DB_CHANGE_COMMIT_URL,IMPACTED_SERVICE_NAME,INSTALL,RESTART,STORY_NUMBER)
VALUES (174, FALSE, TRUE, '', FALSE, '', 'slfcr-location-service', TRUE, FALSE, '2003');
INSERT INTO SERVICE_IMPACT_DETAILS
(ID,CACHE_CLEAR,CODE_CHANGE,CODE_CHANGE_COMMIT_URL,DB_CHANGE,DB_CHANGE_COMMIT_URL,IMPACTED_SERVICE_NAME,INSTALL,RESTART,STORY_NUMBER)
VALUES (175, FALSE, FALSE, '', TRUE, '', 'slfcr-change-plan-service', FALSE, TRUE, '2003');            

