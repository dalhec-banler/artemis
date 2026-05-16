/-  *artemis
/+  artemis
/+  default-agent, dbug, agentio
=,  format
::
|%
+$  versioned-state
  $%  state-0
      state-1
  ==
::  legacy state from houston
+$  state-0  $:
  %0
  mons=(list mon:old)
  ==
::  new map-based state
+$  state-1  $:
  %1
  mons=(map @p mon)
  ==
+$  card  card:agent:gall
::  legacy mon type for migration
++  old
  |%
  +$  mon
    $:  who=@p
        pub=@ud
        sec=@ud
        lif=@ud
        rif=@ud
        sed=@ux
        dat=@da
        tag=(list @tas)
    ==
  --
--
%-  agent:dbug
=|  state-1
=*  state  -
^-  agent:gall
=<
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %|) bowl)
    io    ~(. agentio bowl)
    hc    ~(. +> bowl)
::
++  on-fail   on-fail:def
++  on-leave  on-leave:def
++  on-arvo   on-arvo:def
++  on-save
  ^-  vase
  !>(state)
++  on-init
  ^-  (quip card _this)
  `this
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  ?-  -.old
    %1  `this(state old)
    ::  migrate from houston's list-based state
    %0
      =/  new-mons=(map @p mon)
        %-  ~(gas by *(map @p mon))
        %+  turn  mons.old
          |=  o=mon:old
          :-  who.o
          :*  who.o
              ''
              %personal
              pub.o
              sec.o
              lif.o
              rif.o
              sed.o
              dat.o
              tag.o
          ==
      `this(state [%1 new-mons])
  ==
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+    path  (on-peek:def path)
    [%x %get @ ~]
      =/  who=ship
        (slav %p i.t.t.path)
      ``noun+!>((~(get by mons.state) who))
    [%x %mons ~]
      ``noun+!>(mons.state)
  ==
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+  mark  (on-poke:def mark vase)
      %noun
    `this
    ::
      %artemis-action
    =/  act  !<(action vase)
    ::
    ?.    ?|  =(src.bowl our.bowl)
             ?+  -.act  |
                 %breach-moon
               ?&  =(who.act src.bowl)
                   (team:hc src.bowl)
               ==
             ==
         ==
      `this
    ::
    ?-  -.act
        %make-moon
      =/  mun  (bar-moon:artemis bowl nam.act rol.act)
      ?~  mun
        `this
      =/  mon  u.mun
      =.  mons.state
        (~(put by mons.state) who.mon mon)
      :_  this
      :~
        (jael-moon:artemis mon)
        (give-mons:hc mons.state)
      ==
      ::
        %rekey-moon
      =/  mon=(unit mon)
        (~(get by mons.state) who.act)
      ?~  mon  `this
      =/  new=mon
        (bar-moon-cycle-keys:artemis bowl u.mon)
      =.  mons.state
        (~(put by mons.state) who.act new)
      :_  this
      :~
        (jael-moon:artemis new)
        (give-mons:hc mons.state)
      ==
      ::
        %breach-moon
      =/  =rift
        (bar-moon-breach:artemis bowl who.act)
      =/  mon=(unit mon)
        (~(get by mons.state) who.act)
      ?~  mon  `this
      =.  rif.u.mon  rift
      =.  mons.state
        (~(put by mons.state) who.act u.mon)
      :_  this
      :~
        (jael-moon-breach:artemis who.act rift)
        (give-mons:hc mons.state)
      ==
      ::
        %forget-moon
      =.  mons.state
        (~(del by mons.state) who.act)
      :_  this
      :~
        (give-mons:hc mons.state)
      ==
      ::
        %name-moon
      =/  mon=(unit mon)
        (~(get by mons.state) who.act)
      ?~  mon  `this
      =.  nam.u.mon  nam.act
      =.  mons.state
        (~(put by mons.state) who.act u.mon)
      :_  this
      :~
        (give-mons:hc mons.state)
      ==
      ::
        %set-role
      =/  mon=(unit mon)
        (~(get by mons.state) who.act)
      ?~  mon  `this
      =.  rol.u.mon  rol.act
      =.  mons.state
        (~(put by mons.state) who.act u.mon)
      :_  this
      :~
        (give-mons:hc mons.state)
      ==
      ::
        %add-tag
      =/  mon=(unit mon)
        (~(get by mons.state) who.act)
      ?~  mon  `this
      =/  fund  (find ~[tag.act] tag.u.mon)
      ?~  fund
        =.  tag.u.mon  (snoc tag.u.mon tag.act)
        =.  mons.state
          (~(put by mons.state) who.act u.mon)
        :_  this
        :~
          (give-mons:hc mons.state)
        ==
      `this
      ::
        %del-tag
      =/  mon=(unit mon)
        (~(get by mons.state) who.act)
      ?~  mon  `this
      =/  fund  (find ~[tag.act] tag.u.mon)
      ?~  fund  `this
      =.  tag.u.mon  (oust [u.fund 1] tag.u.mon)
      =.  mons.state
        (~(put by mons.state) who.act u.mon)
      :_  this
      :~
        (give-mons:hc mons.state)
      ==
    ==
  ==
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  `this
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    path
    (on-watch:def path)
      [%moons ~]
    :_  this
    :~
      (give-mons:hc mons.state)
    ==
  ==
--
:: ::
:: :: helper core
:: ::
|_  bowl=bowl:gall
++  give-mons
  |=  mons=(map @p mon)
  =/  upd=update
    [%moons mons]
  (fact:agentio artemis-update+!>(upd) ~[/moons])
++  team
  |=  who=@p
  ^-  ?
  ?&
    =(%earl (clan:title who))
    =(our.bowl (sein:title our.bowl now.bowl who))
  ==
--
