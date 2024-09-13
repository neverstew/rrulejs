# rrulejs

This project aims to create a modern, flexible approach to the iCalendar Recurrence Specification detailed in [RFC2445](https://www.rfc-editor.org/rfc/rfc2445#section-4.8.5).

## Progress

* [x] 4.2 x-param
  * [x] creating
  * [x] parsing
* [x] 4.2.19 Time Zone Identifier
  * [x] creating
  * [x] parsing
* [x] 4.3.4 Date
  * [x] creating
  * [x] parsing
* [x] 4.3.5 Date time
  * Design decision: no floating date times -- they only mess things up
  * Design decision: no time zones -- always convert to UTC
  * [x] creating
  * [x] parsing
* [x] 4.8.5.1 Exdate
  * [x] creating
  * [x] parsing
