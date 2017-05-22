package data_structure;

/**
 * Created by homr on 2017. 5. 22..
 */
public class Link {
    public Link next;
    public int value;

    Link(int v){
        this.value = v;
        this.next = null;
    }

    public void insertNode(int v){
        Link current = this;
        while(current.next!=null){
            current = current.next;
        }

        Link newNode = new Link(v);
        current.next = newNode;
    }

    public int deleteNode(int v){
        Link current = this;
        Link before = null;

        while(current!=null){
            if(current.value==v){
                before.next = current.next;
                return v;
            }
            before = current;
            current = current.next;
        }
        System.out.println("i can't find this value");
        return -1;
    }

    public int search(int v){
        Link current = this;
        while(current!=null){
            if(current.value==v){
                return v;
            }
            current= current.next;
        }
        return -1;
    }

    public void printAll(){
        Link current = this;
            while(current!=null){
            System.out.print(current.value + " ");
            current = current.next;
        }
    }

    public static void main(String[] args){
        Link link = new Link(1);

        link.insertNode(2);
        link.insertNode(4);
        link.insertNode(3);

        link.deleteNode(3);
        link.deleteNode(9);

        System.out.println(link.search(3));
        System.out.println(link.search(4));

        link.printAll();
    }
}
