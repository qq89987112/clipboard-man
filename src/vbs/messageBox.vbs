dim wshshell,objArgs
Set objArgs = WScript.Arguments
set wshshell=wscript.createobject("wscript.shell")
MsgBox objArgs(0),,objArgs(1)