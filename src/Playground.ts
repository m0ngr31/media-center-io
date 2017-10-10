import ParseIni from './Services/ParseIni';

export default class Playground {
  parser: ParseIni;

  constructor() {
    this.parser = new ParseIni();
  }

  parse() {
    this.parser.parse(blankConfig);
    this.parser.set('amzn1.ask.device.XXX', 'address1', '10.0.0.2');
    this.parser.setOjb(basicObj);

    console.log(this.parser.ini);
  }
}

const basicObj = {
  global:
  {
    language: 'de',
    deep_search: 'yes',
    playlist_max_items: '100',
    unwatched_shows_max_results: '100',
    unwatched_episodes_max_results: '100',
    unwatched_movies_max_results: '100',
    loglevel: 'INFO',
    logsensitive: 'yes'
  },
  alexa: { skill_id: '', slot_items_max: '100' },
  DEFAULT:
  {
    scheme: 'https',
    address: '127.0.0.1',
    port: '8080',
    subpath: '',
    username: 'kodi',
    password: 'kodi',
    read_timeout: '120',
    read_timeout_async: '0.01',
    shutdown: '',
    timezone: ''
  },
  'amzn1.ask.device.XXX': { address: '10.0.0.2' }
};

const blankConfig = `#
# Global configuration
#
[global]
# Currently supported languages: en, de
language = en

# By default, if you ask to play media without specifying the type, the skill
# will search through the entire library to find a match.
#
# For example, if you ask, "Alexa, ask Kodi to play ninety nine red balloons,"
# the skill will search library items in the following order to find the song:
#
#   Movies -> Shows -> Artists -> Songs -> Albums
#
# If your library is really large, this can take some time to complete.  While
# it will eventually execute, Alexa may report that the skill timed out.  If
# this behavior bothers you, you can disable deep searches.
#
# When disabled, Alexa will simply provide help in the response directing you
# to issue a play command that includes the media type of the item.
deep_search = yes

# Limit number of items we add to playlists.
#
# Some requests will cause the skill to create a temporary playlist in Kodi
# before executing your command.  This operation is expensive in Kodi, so we
# provide the option here to limit the number of items added.
#
# The default is 100 to match Kodi's own 'party mode.'  Higher values will
# make these operations slower, but if your setup can handle it, you're free
# to set this to whatever you like.
#
# Set to an empty string for unlimited.
playlist_max_items = 100

# Search result limits for new (unwatched) Movies and Episodes.
#
# By default we ask kodi to return a max of 100 results per JSON request.
# Here you can set this figure to optimize the system for you.
# Results are always retrieved in order of newest episodes and movies first.
#
# Lower figures will produce faster results and limit them to only media that
# you've recently added to the library.
unwatched_shows_max_results     = 100
unwatched_episodes_max_results  = 100
unwatched_movies_max_results    = 100

# Set logging level.  Possible values are:
#
# CRITICAL
# ERROR
# WARNING
# INFO
# DEBUG
loglevel = INFO

# Log sensitive or personally identifying information.
#
# Disabling this prevents the skill from logging the target address for Kodi
# and your device IDs.
#
# It is enabled by default to make it easy for you to identify your Echo
# devices for mapping to specific instances of Kodi.
logsensitive = yes

# Global Alexa skill configuration
#
[alexa]
# Set skill_id to enable verification of requests by Flask-Ask.
skill_id =
# Maximum number of items to generate per slot.
#
# If the skill is failing to save, you may need to reduce this.  Conversely,
# if Alexa is having problems distinguishing your requests (executing the
# wrong Intent, for instance), you may need to increase this.
slot_items_max = 100


#
# Default parameters common to all Alexa devices and the web simulator
#
[DEFAULT]
# The Kodi webserver only supports HTTP, but if you've set up a reverse HTTPS
# proxy you can change this to https.
scheme   = http
address  = 127.0.0.1
port     = 8080
# If using a reverse proxy you might need to add an extra bit to the url
# before "jsonrpc" (don't use slashes before or after).
subpath  =
username = kodi
password = kodi

# Read timeout -- how long to wait for responses from Kodi before giving up.
#
# Normally there is no need to change this.
read_timeout = 120

# For some commands, we don't care about the response from Kodi, so we send
# them "fire-and-forget."  If you've got a proxy server in the middle, though,
# it's possible the command might not make it to Kodi before the skill exits.
#
# If Alexa is telling you she has completed a command but it sometimes does
# not actually execute on Kodi, you may need to increase this.
read_timeout_async = 0.01

# Set shutdown to 'quit' if you'd like "Alexa, tell Kodi to shut down"
# to quit Kodi instead of shutting down the system.
shutdown =

# Your local time zone for responses that include absolute times.
# See https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
#
# For example, if you are in the Eastern US time zone, you would use:
# timezone = US/Eastern
#
# Leave empty if you don't need or want absolute time responses.  An example
# is asking when the currently playing item will end.  If you have this
# defined, it will also tell you the wall-clock time when the item will
# conclude.
timezone =


# Override default values by specifying them below for individual devices.
#
# The usual reason to do this is to associate a given Echo device with a
# particular instance of Kodi in your house, but you can override any of
# the other configuration variables from the DEFAULT section here too.
#
# Device IDs can be found in the skill server / lambda log.

# living room dot
[amzn1.ask.device.XXX]
address = living-room-kodi

# kitchen echo
[amzn1.ask.device.XXX]
address = living-room-kodi

# kids room dot
[amzn1.ask.device.XXX]
address = kids-room-kodi

# office dot
[amzn1.ask.device.XXX]
address = office-kodi

# tap
[amzn1.ask.device.XXX]
address = living-room-kodi`;