<img src="https://github.com/JohnPhamous/icm-incidents-notifier/blob/master/icons/icon120.png?raw=true" align="right" />

# IcM Incidents Notifier

> A browser extension that will send you notifications when there are new incidents.

## How to use

1. Download this repository
1. Load the extension (edge://extensions/)
1. Have your IcM incidents page opened with auto refresh set to `1m`.

## Compatibility

Tested on:

* Microsoft Edge
* Google Chrome

## Why use this?

Most IcM configurations only notify (via text or phone call) the primary on-call person. For some teams, the role of primary and secondary are just labels and both people need to respond to incidents. If your configuration only notifies the primary, the secondary either has to wait for the primary to let the secondary know or check the incidents page every minute. This extension allows the secondary, and anyone else on the incident page to get notified when there are new incidents.

## How it works

1. Records how many incidents there are
2. After a network request for new incidents is made, calculate the difference
3. If the difference greater than 1, create a notification

## Privacy Statement

* No data is sent off your machine
