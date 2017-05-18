#include<stdio.h>

#define MAXLEN 10000

int length=0;
double max = 0;
double arr[MAXLEN];
int include[MAXLEN];

void maxMultiply(int k){
    double data = 1;
    int flag = 0;

    if(k==length){
        for(int i = 0; i<length; i++){
            if(include[i]==1){
                data = arr[i] * data;
                flag=1;
            }
            if(data>max){
                max=data;
            }
            if((flag==1)&&(include[i]==0)){
                break;
            }
            
        }
        return;
    }
    include[k] = 0;
    maxMultiply(k+1);
    include[k] = 1;
    maxMultiply(k+1);
}

int main(){
    scanf("%d", &length);

    for(int i=0; i<length; i++){
        scanf("%lf", &arr[i]);
    }

    maxMultiply(0);
    printf("%.3lf\n", max);

    return 0;
}