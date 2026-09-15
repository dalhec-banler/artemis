::  satellite: relay for %mobile moons, so a phone acts as its planet
::
::    A moon is an ordinary foreign ship to every Gall agent, and Tlon's
::    %chat only takes client pokes and watches from the ship itself. This
::    agent runs on the planet, subscribes to %chat locally, re-gives what it
::    hears to allowed moons as JSON, and re-issues the moon's requests
::    locally so that src.bowl is the planet: one identity, two ships.
::
::    Allowed moons: moons of this ship that Artemis minted with role %mobile.
::
/-  *artemis
/+  default-agent, dbug
|%
+$  card  card:agent:gall
+$  state-0
  $:  %0
      moons=(set ship)        ::  currently watching
      allowed=(set ship)      ::  explicitly allowed by the planet's owner
  ==
--
=|  state-0
=*  state  -
%-  agent:dbug
^-  agent:gall
=<
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %|) bowl)
    hc    ~(. +> bowl)
::
++  on-init
  ^-  (quip card _this)
  :_  this
  ~[watch-chat:hc]
::
++  on-save  !>(state)
++  on-load
  |=  old=vase
  ^-  (quip card _this)
  :_  this(state !<(state-0 old))
  ~[watch-chat:hc]
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark  (on-poke:def mark vase)
      %noun
    ?>  =(src.bowl our.bowl)
    =+  !<([%allow who=ship] vase)
    `this(allowed (~(put in allowed) who))
  ::
      %json
    ?>  (permitted:hc src.bowl)
    :_  this
    (handle:hc src.bowl !<(json vase))
  ==
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?>  (permitted:hc src.bowl)
  ?+    path  (on-watch:def path)
      [%moon %chat ~]
    :_  this(moons (~(put in moons) src.bowl))
    ~[[%give %fact ~ %json !>(snapshot:hc)]]
  ==
::
++  on-leave
  |=  =path
  ^-  (quip card _this)
  `this(moons (~(del in moons) src.bowl))
::
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    wire  (on-agent:def wire sign)
      [%chat ~]
    ?+    -.sign  `this
        %kick
      :_  this  ~[watch-chat:hc]
        %fact
      =/  jon=(unit json)  (to-json:hc cage.sign)
      ?~  jon  `this
      :_  this
      ~[[%give %fact ~[/moon/chat] %json !>((frond:enjs:format 'chat' u.jon))]]
    ==
  ::
      [%fwd @ ~]
    ?.  ?=(%poke-ack -.sign)  `this
    ?~  p.sign  `this
    :_  this
    :~  :*  %give  %fact  ~[/moon/chat]  %json
            !>  %+  frond:enjs:format  'error'
                (pairs:enjs:format ~[['action' s+`@t`i.t.wire] ['reason' s+'the planet refused the action']])
    ==  ==
  ==
::
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+  path  (on-peek:def path)
      [%x %moons ~]
    =/  jon=json  a+(turn ~(tap in moons) |=(s=ship ^-(json s+(scot %p s))))
    ``json+!>(jon)
  ==
++  on-arvo  on-arvo:def
++  on-fail  on-fail:def
--
::
|_  =bowl:gall
::  +allowed: the planet itself, or one of its %mobile moons per Artemis
::
++  permitted
  |=  who=ship
  ^-  ?
  ?:  =(who our.bowl)  &
  ?.  (moon:title our.bowl who)  |
  ?:  (~(has in allowed) who)  &
  =/  m=(unit mon)
    .^  (unit mon)  %gx
        /(scot %p our.bowl)/artemis/(scot %da now.bowl)/get/(scot %p who)/noun
    ==
  ?~  m  |
  =(%mobile rol.u.m)
::
++  watch-chat
  ^-  card
  [%pass /chat %agent [our.bowl %chat] %watch /v4]
::
::  +to-json: convert any %chat fact to JSON with the desk's own marks
::
++  to-json
  |=  =cage
  ^-  (unit json)
  =/  tub=tube:clay
    .^  tube:clay  %cc
        /(scot %p our.bowl)/groups/(scot %da now.bowl)/[p.cage]/json
    ==
  `!<(json (tub q.cage))
::
++  chat-json
  |=  pax=path
  ^-  json
  .^  json  %gx
      %+  weld  /(scot %p our.bowl)/chat/(scot %da now.bowl)
      (weld pax /json)
  ==
::
::  +snapshot: everything a phone needs to start: the DM list, recent
::  writs per DM, unread state
::
++  snapshot
  ^-  json
  =/  dms=json  (chat-json /dm)
  =/  ships=(list ship)
    ?.  ?=([%a *] dms)  ~
    %+  murn  p.dms
    |=  j=json
    ?.  ?=([%s *] j)  ~
    (slaw %p p.j)
  =/  writs=(list [@t json])
    %+  turn  ships
    |=  s=ship
    :-  (scot %p s)
    (chat-json /dm/(scot %p s)/writs/newest/50/light)
  %+  frond:enjs:format  'snapshot'
  %-  pairs:enjs:format
  :~  ['our' s+(scot %p our.bowl)]
      ['dms' dms]
      ['writs' (pairs:enjs:format writs)]
      ['unreads' (chat-json /unreads)]
  ==
::
::  +handle: a moon's request, re-issued locally as the planet
::
++  handle
  |=  [from=ship jon=json]
  ^-  (list card)
  =,  dejs:format
  =/  act
    %.  jon
    %-  of
    :~  send-dm+(ot ~[ship+(se %p) text+so])
        read-dm+(se %p)
    ==
  ?-    -.act
      %send-dm
    =/  [=ship text=@t]  +.act
    =/  id=@t  (rap 3 (scot %p our.bowl) '/' (scot %ud now.bowl) ~)
    =/  action=json
      %-  pairs:enjs:format
      :~  ['ship' s+(scot %p ship)]
          :-  'diff'
          %-  pairs:enjs:format
          :~  ['id' s+id]
              :-  'delta'
              %+  frond:enjs:format  'add'
              %-  pairs:enjs:format
              :~  :-  'essay'
                  %-  pairs:enjs:format
                  :~  ['content' a+~[(frond:enjs:format 'inline' a+~[s+text])]]
                      ['author' s+(scot %p our.bowl)]
                      ['sent' (time:enjs:format now.bowl)]
                      ['kind' s+'/chat']
                      ['meta' ~]
                      ['blob' ~]
                  ==
                  ['time' ~]
              ==
          ==
      ==
    =/  tub=tube:clay
      .^  tube:clay  %cc
          /(scot %p our.bowl)/groups/(scot %da now.bowl)/json/chat-dm-action-2
      ==
    ~[[%pass /fwd/send-dm %agent [our.bowl %chat] %poke %chat-dm-action-2 (tub !>(action))]]
  ::
      %read-dm
    =/  action=json
      %-  pairs:enjs:format
      :~  ['whom' s+(scot %p +.act)]
          ['diff' (frond:enjs:format 'read' ~)]
      ==
    =/  tub=tube:clay
      .^  tube:clay  %cc
          /(scot %p our.bowl)/groups/(scot %da now.bowl)/json/chat-remark-action
      ==
    ~[[%pass /fwd/read-dm %agent [our.bowl %chat] %poke %chat-remark-action (tub !>(action))]]
  ==
--
