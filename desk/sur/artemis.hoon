|%
::  role: what this moon is used for
::
+$  role  ?(%mobile %agent %dev %personal)
::  mon: a managed moon
::
+$  mon
  $:  who=@p            :: moon identity
      nam=@t            :: human-readable name
      rol=role          :: purpose
      pub=@ud           :: public key
      sec=@ud           :: private key
      lif=@ud           :: life (key generation)
      rif=@ud           :: rift (breach count)
      sed=@ux           :: precomputed seed
      dat=@da           :: creation date
      tag=(list @tas)   :: custom tags
  ==
::  action: pokes from the frontend
::
+$  action
  $%
    [%make-moon nam=@t rol=role]
    [%rekey-moon who=@p]
    [%breach-moon who=@p]
    [%forget-moon who=@p]
    [%name-moon who=@p nam=@t]
    [%set-role who=@p rol=role]
    [%add-tag who=@p tag=@tas]
    [%del-tag who=@p tag=@tas]
  ==
::  update: subscription facts to the frontend
::
+$  update
  $%
    [%moons mons=(map @p mon)]
  ==
--
