

var copied_party_link = ""
var canvas = document.getElementById("canvas");
var m_window_array = []
var multibox_count = 0;
var typing = false
var scale = window.localStorage['no_retina'] ? 1.0 : window.devicePixelRatio;


function create_multibox_window()
{
    var url = "https://" + copied_party_link
    document.title = "diep.io (main)"
    var m_window = window.open(url);
    multibox_count++;
    m_window_array.push(m_window)
}



function preventDefault(e){
    if(e.preventDefault) e.preventDefault();
}

function flushInputHooks()
{
    if(window["input"] && window["input"]["flushInputHooks"]) window["input"]["flushInputHooks"]();
}


















function hook_input_to_multibox_windows()
{
    
    canvas.onmousemove = function(e)
    {
        e = e || window.event;
        
        if(!window['input']) return;
        window['input']['mouse'](e.clientX * scale, e.clientY * scale);
        for (let i = 0 ; i < multibox_count ; i++)
        {
            var m_window = m_window_array[i];
            var m_scale = m_window.localStorage['no_retina'] ? 1.0 : window.devicePixelRatio;
            var m_canvas = m_window.document.getElementById("canvas")
            m_window['input']['mouse'](e.clientX * m_scale * (m_canvas.width / canvas.width),
                                       e.clientY * m_scale * (m_canvas.height / canvas.height));
        }
    }


    window.onkeydown = function(e)
    {
        flushInputHooks();
        
        e = e || window.event;
        
        if(!window['input']) return;
        if(e.keyCode >= 112 && e.keyCode <= 130 && e.keyCode != 113) return; // F2- keys, don't prevent
        window['input']['keyDown'](e.keyCode);
        for (let i = 0 ; i < multibox_count ; i++)
        {
            var m_window = m_window_array[i];
            m_window['input']['keyDown'](e.keyCode);
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
        for (let i = 0 ; i < multibox_count ; i++)
        {
            var m_window = m_window_array[i];
            m_window['input']['keyUp'](e.keyCode);
        }
        
        if(e.keyCode == 9) preventDefault(e);
        if(!typing && !e.ctrlKey && !e.metaKey) preventDefault(e);
    }


}















function unhook_input_from_multibox_windows()
{
    
    canvas.onmousemove = function(e)
    {
        e = e || window.event;
        
        if(!window['input']) return;
        window['input']['mouse'](e.clientX * scale, e.clientY * scale);
    }


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




function octo_tank_multibox_queue_setup()
{
    for (let i = 0 ; i < multibox_count ; i++)
    {
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
