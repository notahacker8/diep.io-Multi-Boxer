
//Some of this code is from the 'c.js' file within the diep.io website.
//Variables and functions from c.js will have a 'c.js' comment next to them.


var copied_party_link = ""
var canvas = document.getElementById("canvas");
var m_window_array = []
var typing = false //c.js
var scale = window.localStorage['no_retina'] ? 1.0 : window.devicePixelRatio; //c.js


function multibox()
{
    var url = "https://" + copied_party_link
    document.title = "diep.io (main)"
    var m_window = window.open(url);
    m_window_array.push(m_window)
}


//c.js
function preventDefault(e){
    if(e.preventDefault) e.preventDefault();
}

//c.js
function flushInputHooks()
{
    if(window["input"] && window["input"]["flushInputHooks"]) window["input"]["flushInputHooks"]();
}















//Anytime we move our tank or press a key or move our mouse, the inputs will be sent to the other windows.
//This is basically a copy of the 'unhook' function, but we are adding code that iterates the inputs through the other windows.
function hook()
{
    
    canvas.onmousemove = function(e)
    {
        e = e || window.event;
        
        if(!window['input']) return;
        window['input']['mouse'](e.clientX * scale, e.clientY * scale);
        for (let i = 0 ; i < m_window_array.length ; i++)
        {
            var m_window = m_window_array[i].window;
            if (m_window)
            {
                if (m_window["input"])
                {
                    var m_scale = m_window.localStorage['no_retina'] ? 1.0 : m_window.devicePixelRatio;
                    if (m_scale)
                    {
                        var m_canvas = m_window.document.getElementById("canvas")
                        if (m_canvas)
                        {
                        m_window['input']['mouse'](e.clientX * m_scale * (m_canvas.width / canvas.width),
                                                   e.clientY * m_scale * (m_canvas.height / canvas.height));
                        }
                    }
                }
            }
            else
            {
                m_window_array.splice(i, 1);
            }
        }
    }


    window.onkeydown = function(e)
    {
        flushInputHooks();
        
        e = e || window.event;
        
        if(!window['input']) return;
        if(e.keyCode >= 112 && e.keyCode <= 130 && e.keyCode != 113) return; // F2- keys, don't prevent
        window['input']['keyDown'](e.keyCode);
        for (let i = 0 ; i < m_window_array.length ; i++)
        {
            var m_window = m_window_array[i].window;
            if (m_window)
            {
                if (m_window["input"])
                {
                    m_window['input']['keyDown'](e.keyCode);
                }
            }
            else
            {
                m_window_array.splice(i, 1);
            }
        }
        
        if(e.keyCode == 9) preventDefault(e);
        if(!typing && !e.ctrlKey && !e.metaKey) preventDefault(e);
    }

    window.onkeyup = function(e)
    {
        flushInputHooks();
        
        e = e || window.event;
        
        if(!window['input']) return;
        if(e.keyCode >= 112 && e.keyCode <= 130 && e.keyCode != 113) return; // F2- keys, don't prevent
        window['input']['keyUp'](e.keyCode);
        for (let i = 0 ; i < m_window_array.length ; i++)
        {
            var m_window = m_window_array[i].window;
            if (m_window)
            {
                if (m_window["input"])
                {
                    m_window['input']['keyUp'](e.keyCode);
                }
            }
            else
            {
                m_window_array.splice(i, 1);
            };
        }
        
        if(e.keyCode == 9) preventDefault(e);
        if(!typing && !e.ctrlKey && !e.metaKey) preventDefault(e);
    }


}














//If in any case, we want to unhook the input to the multibox windows from the main window.
function unhook()
{
    
    //c.js
    canvas.onmousemove = function(e)
    {
        e = e || window.event;
        
        if(!window['input']) return;
        window['input']['mouse'](e.clientX * scale, e.clientY * scale);
    }

    //c.js
    window.onkeydown = function(e)
    {
        flushInputHooks();
        
        e = e || window.event;
        
        if(!window['input']) return;
        if(e.keyCode >= 112 && e.keyCode <= 130 && e.keyCode != 113) return; // F2- keys, don't prevent
        window['input']['keyDown'](e.keyCode);
        if(e.keyCode == 9) preventDefault(e);
        if(!typing && !e.ctrlKey && !e.metaKey) preventDefault(e);
    }

    //c.js
    window.onkeyup = function(e)
    {
        flushInputHooks();
        
        e = e || window.event;
        
        if(!window['input']) return;
        if(e.keyCode >= 112 && e.keyCode <= 130 && e.keyCode != 113) return; // F2- keys, don't prevent
        window['input']['keyUp'](e.keyCode);
        if(e.keyCode == 9) preventDefault(e);
        if(!typing && !e.ctrlKey && !e.metaKey) preventDefault(e);
    }


}



//A function for fun, meaning so we can set up octo-tanks easily like in the sample image.
function octo()
{
    for (let i = 0 ; i < m_window_array.length ; i++)
    {
        //Got this command from the diep.io wiki page for console commands.
        m_window_array[i].input.execute("game_stats_build 657821656577224656546572277257444");
    }
    window.input.execute("game_stats_build 657821656577224656546572277257444");
    /*
     1: health regen
     2: max health
     3: body dmg
     4: bullet speed
     5: bullet pen
     6: bullet dmg
     7: reload
     8: speed
     */
    
}

