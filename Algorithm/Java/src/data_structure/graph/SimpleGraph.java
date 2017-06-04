package data_structure.graph;

import com.sun.javafx.geom.Edge;

import java.util.HashMap;

/**
 * Created by homr on 2017. 5. 25..
 */
public class SimpleGraph {
    private HashMap<Integer, Edge> vertextList;

    public SimpleGraph(){
        vertextList = new HashMap<Integer, Edge>();
    }

    public void createVertex(int value){
        Edge edge = new Edge(value, 0);
        vertextList.put(value, edge);
    }

    public void insertEdge(int v1, int v2, double weight){
        Edge curr = vertextList.get(v1);
        while(curr.next !=null){
            if(curr.value==v2){
                curr.weight = weight;
                return;
            }
            curr = curr.next;
        }
        Edge newEdge = new Edge(v2, weight);
        curr.next = newEdge;
    }

    public void printList(int value){
        Edge curr = vertextList.get(value);
        System.out.print(value+": ");
        while(curr!= null){
            System.out.printf("%d (%.2f)", curr.value, curr.weight );
        }
        System.out.println();
    }

    class Edge{
        int value;
        double weight;
        Edge next = null;

        Edge(int value, double weight){
            this.value = value;
            this.weight = weight;
        }
    }


}