'use strict'; 

var St = imports.gi.St;
var Main = imports.ui.main;
var Gio = imports.gi.Gio;
var ExtensionUtils = imports.misc.extensionUtils;
var Util = imports.misc.util;
var Shell = imports.gi.Shell;
var Me = ExtensionUtils.getCurrentExtension();
var app = Shell.AppSystem.get_default().lookup_app("rocket-chat.desktop");
var snap = false;
if (app === null || app === undefined) {
  app = Shell.AppSystem.get_default().lookup_app("rocketchat-desktop_rocketchat-desktop.desktop");
  snap = true;
}


var text, button;

function _showRocketChat() {
  if (app === null) {
    throw new Error("Could not find RocketChat! Make sure that the Desktop entry file 'rocketchat.desktop' is available.");
  }

  if (app === undefined) {
    throw new Error("Could not find RocketChat! Make sure that the Desktop entry file 'rocketchat.desktop' is available.");
  }

  if (app.get_state() === 0) {
    if (snap) {
      Util.spawn(['/snap/bin/rocketchat-desktop']);
    } else {
      Util.spawn(['/opt/Rocket.Chat+/rocketchat']);
    }
    
  }

  if (app.get_state() === 2) {
    app.activate();
  }
}

function init() {
  button = new St.Bin({
    style_class: 'panel-button',
    reactive: true,
    can_focus: true,
    x_fill: true,
    y_fill: false,
    track_hover: true
  });

  var gicon = Gio.icon_new_for_string(Me.path + "/icon.png");
  var icon = new St.Icon({gicon: gicon, icon_size: '20'});

  button.set_child(icon);
  button.connect('button-press-event', _showRocketChat);
}

function enable() {
  Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
  Main.panel._rightBox.remove_child(button);
}
