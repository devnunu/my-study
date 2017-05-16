#include<stdio.h>

#define LEN 10
#define TRUE 1
#define FALSE 0

typedef struct _stack{
    int arr[LEN];
    int top;
} stack;

void init(stack* st){
    st->top = -1;
}

int isEmpty(stack* st){
    return st->top==-1 ? TRUE : FALSE;
}

void push(stack* st, int data){
    st->top++;
    st->arr[st->top] = data;
}

int pop(stack* st){
    int top = st->top;
    int popData;

    if(isEmpty(st)==TRUE){
        printf("this is empty array\n");
        return 0;
    }
    else{
        popData = st->arr[top];
        st->top--;
        return popData;
    }
    
}

void peek(stack* st){
    int top = st->top;
    if(isEmpty(st)==TRUE){
        printf("this is empty array\n");
    }
    else{
        printf("%d\n",st->arr[top]);
    }
}

void printStack(stack* st){
    for(int i = 0; i < st->top+1; i++){
        printf("%d\n", st->arr[i]);
    }
}

int main(){
    int chooseNum, data;
    stack st;
    init(&st);

    while(TRUE){
        printf("연산을 고르세요\n");
        printf("1.삽입  2.삭제  3.top 조회 4.전체 stack 조회 5.종료\n");

        scanf("%d", &chooseNum);

        switch(chooseNum){
            case 1:
                printf("삽입 할 데이터를 입력해주세요 : ");
                scanf("%d", &data);
                push(&st, data);
                break;
            case 2:
                printf("삭제된 데이터 %d\n", pop(&st));
                break;
            case 3:
                printf("top에 있는 데이터는 ");
                peek(&st);
                break;
            case 4:
                printStack(&st);
                break;
            case 5:
                printf("프로그램을 종료합니다.\n");
                return 0;
                break;
            default:
                printf("정확한 명령을 입력해 주시기 바랍니다.\n");
        }
    }

    return 0;
}