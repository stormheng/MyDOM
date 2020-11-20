window.dom = {
    //创建一个节点
    create(string){
        //template可以用来容纳任何标签
        const container = document.createElement("template");
        container.innerHTML = string.trim();//trim()用来去除字符串两头的空格
        return container.content.firstChild;
    },
    //在节点后面创建新结点
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    //在节点之前创建新节点
    before(node, node2){
        node.parentNode.insertBefore(node2, node);
    },
    //给节点新增子节点
    append(parent, node){
        parent.appendChild(node)
    },
    //给节点新增父节点
    wrap(node, parent){
        //先把parent节点插到node节点前面
        dom.before(node, parent)
        //再把node节点插到parent节点里面
        dom.append(parent, node)
    },
    //删除节点
    remove(node){
        node.parentNode.removeChild(node)
        return node
    },
    //删除后代节点
    empty(node){
        const array = []
        let x = node.firstChild
        while(x){
          array.push(dom.remove(node.firstChild))
          x = node.firstChild
        }
        return array
    },
    //读写属性
    attr(node, name, value){ // 重载
        if(arguments.length === 3){
          node.setAttribute(name, value)
        }else if(arguments.length === 2){
          return node.getAttribute(name)
        }
    },
    //读写文本内容
    text(node, string){ // 适配
        if(arguments.length ===2 ){
          if('innerText' in node){
            node.innerText = string 
          }else{
            node.textContent = string 
          }
        }else if(arguments.length === 1){
          if('innerText' in node){
            return node.innerText
          }else{
            return node.textContent
          }
        }
    },
    //读写html内容
    html(node, string){
        if(arguments.length === 2){
          node.innerHTML = string
        }else if(arguments.length === 1){
          return node.innerHTML 
        }
    },
    //修改style
    style(node, name, value){
        if(arguments.length===3){
          // dom.style(div, 'color', 'red')
          node.style[name] = value
        }else if(arguments.length===2){
          if(typeof name === 'string'){
            // dom.style(div, 'color')
            return node.style[name]
          }else if(name instanceof Object){
            // dom.style(div, {color: 'red'})
            const object = name
            for(let key in object){
              node.style[key] = object[key]
            }
          }
        }
    },
    //dom.class.add(node, 'blue')添加class
    class: {
        add(node, className){
          node.classList.add(className)
        },
        //删除class
        remove(node, className){
          node.classList.remove(className)
        },
        //检测是否包含某class
        has(node, className){
          return node.classList.contains(className)
        }
    },
    //添加事件监听
      on(node, eventName, fn){
        node.addEventListener(eventName, fn)
      },
      //删除事件监听
      off(node, eventName, fn){
        node.removeEventListener(eventName, fn)
      },
      //获取标签或标签们
      find(selector, scope){
        return (scope || document).querySelectorAll(selector)
      },
      //获取父元素
      parent(node){
        return node.parentNode
      },
      //获取子元素
      children(node){
        return node.children
      },
      //获取兄弟姐妹元素
      siblings(node){
        return Array.from(node.parentNode.children)
        .filter(n=>n!==node)
      },
      //获取后一个节点
      next(node){
        let x = node.nextSibling
        while(x && x.nodeType === 3){
          x = x.nextSibling
        }
        return x
      },
      //获取前一个节点
      previous(node){
        let x = node.previousSibling
        while(x && x.nodeType === 3){
          x = x.previousSibling
        }
        return x
      },
      //遍历所有节点
      each(nodeList, fn){
        for(let i=0;i<nodeList.length;i++){
          fn.call(null, nodeList[i])
        }
      },
      //获取节点排行第几
      index(node){
        const list = dom.children(node.parentNode)
        let i
        for(i=0;i<list.length;i++){
          if(list[i] === node){
            break
          }
        }
        return i
      }
}