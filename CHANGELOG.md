# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.7.5] - 2/23/2025|
* update packages
## [1.7.4] - 9/25/2023|
* fix versioning
## [1.7.3] - 9/25/2023|
* fix development environment
## [1.7.2] - 9/25/2023|
* update README file
## [1.7.1] - 9/21/2023|
* chore: fix type import
* chore: remove enter from trigger list
* fix: build issue

## [1.7.0] - 9/19/2023|
- use vite
- remove website from the repo
- refactor first step
- add some rules to the eslint
- remove rem 
- move example to vite 
- support cjs and es
- add focus style and callback
- update packages
## [1.6.3] - 5/16/2022|
- add inputId prop 
## [1.6.2] - 2/15/2022|
- fix readme and npm version
## [1.6.1] - 2/15/2022|

- fix week day order in Persian
## [1.6.0] - 1/31/2022|

- fix init value issue (there is no need extra state to handle init or update value from outside of calendar)
- add autoClose by true default to close modal after selecting date
- add closing icon if autoClose is false
- fix onchange twice running
- fix onCalenderHide running by close icon
## [1.5.7] - 11/19/2021|

- fix persian month title

## [1.5.6] - 9/23/2021|

- fix year scroll issue
- add year style type (grid,list)
- add showTimeInput in order to show time in input
- update doc

## [1.5.5] - 8/24/2021|

- fix month component width

## [1.5.4] - 8/24/2021|

- fix width issue and change some style

## [1.5.3] - 8/19/2021|

- change typing structure

## [1.5.2] - 8/19/2021|

- fix exporting types

## [1.5.1] - 5/27/2021|

- fix initial value render issus

## [1.5.0] - 5/27/2021|

- replace Persian date with Jalaali-js
- fix time init value
- fix min date as initial Value
- move view to selected date after closing calendar modal
- change year view style
- increase range of year
- remove fullDay from result object
- add config to remove consoles
- refactor time component
- wrap some component with memo

## [1.4.2] - 5/21/2021|

- fix time input direction and icon style
- add iransance to website

## [1.4.1] - 5/21/2021|

- fix range type

## [1.4.0] - 5/21/2021|

- use rollup for build
- attach modal to input

## [1.3.4] - 4/29/2021|

- fix time view in fa mode
- fix selected day style in range mode
- add type to local and type mode prop
- fix helper folder naming

## [1.3.3] - 3/22/2021|

- fix jalali month start point

## [1.3.2] - 2/8/2021|

- remove index.js from build folder
- fix persian number in android devices
- make next and prev title dynamically

## [1.3.1] - 2/8/2021|

- fix time value after changing init value

## [1.3.0] - 2/7/2021|

- reset calender value when selected value is empty

## [1.2.9] - 2/7/2021|

- fix async initial value
- update website

## [1.2.8] - 2/6/2021|

- move rimraf to devDep

## [1.2.7] - 2/6/2021|

- fix package build problem

## [1.2.6] - 2/5/2021|

- Improve website
- fix some issues

## [1.2.5] - 2/4/2021|

- Complete doc website
- fix date convertor utilities

## [1.2.4] - 2/2/2021|

- fix readme - website link

## [1.2.3] - 2/2/2021|

- fix readme file

## [1.2.2] - 2/2/2021|

- fix empty iteration for production mode
- fix constructor rule
- fix image url in readme file

## [1.2.0] - 1/30/2021

- add documenting website
- fix some issues
- add calender component
- add two helper function to convert EN to FA and vice versa

## [1.1.2] - 12/30/2020

- fix date style when from date is equal to to date
- fix calender date after user use clear btn
- change disabled date style

## [1.1.1] - 12/25/2020

- fix weekend color

## [1.1.0] - 12/25/2020

- add style to all components

## [1.0.5] - 12/14/2020

- add list of disabled date

## [1.0.4] - 12/13/2020

- add placeholders and labels
- add classes options for different component

## [1.0.3] - 12/12/2020

- fix onChange api
- add isRequired
- add function to check all initial values

## [1.0.2] - 12/8/2020

- Added today button

## [1.0.0] - 12/8/2020

- Added min and max date to limit selectable date
- Added disable option to disable input
