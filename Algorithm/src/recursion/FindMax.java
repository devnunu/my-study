package recursion;

/**
 * Created by homr on 2017. 4. 16..
 */
public class FindMax {
    public static void main(String[] args){
        int[] arr = {1,2,3,4,5,6,7,8,9};
        System.out.println(findMax(arr,0,arr.length-1));
    }
    public static int findMax(int [] data, int begin, int end){
        if(begin==end)
            return data[begin];
        else
            return Math.max(data[begin], findMax(data, begin+1, end));
    }

}
