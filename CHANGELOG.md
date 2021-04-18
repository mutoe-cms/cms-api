## [0.3.2](https://github.com/mutoe-cms/cms-api/compare/v0.3.1...v0.3.2) (2021-04-18)


### Features

* **env:** add local env support ([a214628](https://github.com/mutoe-cms/cms-api/commit/a214628c405483d022fba37d137ea33ba7506d06) [e037639](https://github.com/mutoe-cms/cms-api/commit/e03763904442a6f7ba800ed75e38549c5a1055a3))
* **article:** support add category when create article ([8a8e701](https://github.com/mutoe-cms/cms-api/commit/8a8e7019f7e1413084630520721d724af5eb5e12))
* **category:** implement create category API ([17ae69d](https://github.com/mutoe-cms/cms-api/commit/17ae69d078728ed881a77f998df7020aba92b93c))
* **category:** implement retrieve category API ([7ac11b0](https://github.com/mutoe-cms/cms-api/commit/7ac11b02e93dcd66b9896debf068e5e46127d3f9))
* **category:** support update category when update article ([9f84efa](https://github.com/mutoe-cms/cms-api/commit/9f84efa64c989bd6fce57d3e3bc269ea63adcbac))
* **tag:** add tags seed ([2118caf](https://github.com/mutoe-cms/cms-api/commit/2118cafcd0d920ce723b07d5a4dbcccaa409dddd))


### Bug Fixes

* **article:** return author object after create/update article ([cd2a0c7](https://github.com/mutoe-cms/cms-api/commit/cd2a0c7a1a2c37ea4f1b8ba86938edec3e8511d5))



## [0.3.1](https://github.com/mutoe-cms/cms-api/compare/v0.3.0...v0.3.1) (2021-04-07)


### Features

* **article:** retrieve single article ([62c7aee](https://github.com/mutoe-cms/cms-api/commit/62c7aee527cd6863a9c5ed497e9b1fec3c49488b))
* **article:** support tags when create article ([b82a5a1](https://github.com/mutoe-cms/cms-api/commit/b82a5a1601c58bd7713bc0fc25075cd39462ff8d))
* **article:** update single article ([bcb98c5](https://github.com/mutoe-cms/cms-api/commit/bcb98c5340403cd336c59e64f33c13bd01fdf06a))
* **tag:** add create tag api ([4a435b7](https://github.com/mutoe-cms/cms-api/commit/4a435b7bf626e32de7ad884a1034995c317c0331))
* **tag:** retrieve tags api ([f439116](https://github.com/mutoe-cms/cms-api/commit/f439116526b5b3a2a164b735096889f0a374c142))


### Bug Fixes

* fix dto optional decorator ([db44a42](https://github.com/mutoe-cms/cms-api/commit/db44a42ed17f32baaccdcc163af6af44d042cc62))
* **article:** prefill article tags when edit an article ([8e623fb](https://github.com/mutoe-cms/cms-api/commit/8e623fbf5bee9b85b91dafcd729a38d37daf1d69))
* **article:** not show error when submit create article request ([a1fb3c9](https://github.com/mutoe-cms/cms-api/commit/a1fb3c9c3a77e34fac51436f2f551d0ac3466219))
* **article:** should not display password field in article author field ([56268e9](https://github.com/mutoe-cms/cms-api/commit/56268e9a5e4ab5487d5c5dbfdb1a5ccd857879ae))



## [0.3.0](https://github.com/mutoe-cms/cms-api/compare/a629bc2...v0.3.0) (2021-03-14)


### Features

* enable CORS in development mode ([88b69f6](https://github.com/mutoe-cms/cms-api/commit/88b69f65872965ba2de2efa6404f4570897eb75b))


### Bug Fixes

* fix test match issue ([88535a0](https://github.com/mutoe-cms/cms-api/commit/88535a0832ab982bce6543058a615e2a07646b5b))



# 0.2.0 (2020-08-23)


### Features

* implement server validation error ([2d0d0d4](https://github.com/mutoe/cms/commit/2d0d0d4e33ddf4736d15191da113d6e99df13934))
* **auth:** implement retrieve user profile using token ([ac12eba](https://github.com/mutoe/cms/commit/ac12eba0009087cd81b9d4d21a3d6b6d95f03db4))
* **auth:** implement login feature ([7fddfc9](https://github.com/mutoe/cms/commit/7fddfc9159d5531226dbfdf9fb0e0f5b2b099326))
